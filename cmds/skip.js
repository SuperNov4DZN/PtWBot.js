module.exports.run = async (bot, message, args) => {
    const serverQueue = bot.queue.get(message.guild.id);
	if (!message.member.voice.channel) {
        return message.channel.send('You have to be in a voice channel to skip the music!')
    };
    if (message.member.voice.channel != serverQueue.voiceChannel){
        return message.channel.send('You need to be in my channel to skip musics!');
    }
	if (!serverQueue) {
        return message.channel.send('There is no song that I could skip!')
    };
    if (!isNaN(args[0]) && args[0] < serverQueue.songs.length) {
        serverQueue.songs.splice(0, args[0]-1);
    }

	serverQueue.connection.dispatcher.end();
}

module.exports.help = {
    name: "skip",
    allias: "pular"
}
