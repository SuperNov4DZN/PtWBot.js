const {yt_token} = module.require("../config.json");
const request = module.require("request");
const ytdl = module.require("ytdl-core");


function timeFormat(duration) {   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// Checks if a given string is a link to youtube
function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}
// Uses the yt api to search a given querry and outputs the first result
function searchVideo(querry, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(querry) + "&key=" + yt_token, (err, response, body) => {
        var json = JSON.parse(body);
        callback(json.items[0].id.videoId);
    });
}
// Returns a link to the youtube video
function getYoutubeId(str, callback) {
    if (isYoutube(str)) {
        callback(str);
    } else {
        searchVideo(str, (id) => callback("https://www.youtube.com/watch?v=" + id));
    }
}

function play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url, { quality: "highestaudio", requestOptions: { maxReconnects: 1, maxRetries: 2 }}))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
    serverQueue.textChannel.send(`Started playing: **${song.title}**`);
  }

module.exports.run = async (bot, message, args) => {
    try {
        const queue = bot.queue;
        const serverQueue = bot.queue.get(message.guild.id);

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }

        const ytIdResult = new Promise(resolve => {
            getYoutubeId(args.join(" "), (id) => resolve(id));
        });
        const ytId = await ytIdResult;

        const songInfo = await ytdl.getInfo(ytId);
        const song = {
            duration: timeFormat(songInfo.videoDetails.lengthSeconds),
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };

        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 100,
                playing: true
            };

            queue.set(message.guild.id, queueContruct);

            queueContruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(
                `**${song.title}** has been added to the queue!`
            );
        }
    } catch (error) {
        console.log(error);
        message.channel.send(error.message);
    }
}

module.exports.help = {
    name: "play",
    allias: "tocar",
    description: "Uso: \"!play <youtube url> ou !play <nome da musica>\" \nToca a música desejada no voice."
}
