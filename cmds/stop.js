module.exports.run = async (bot, message, args) => {
    const serverQueue = bot.queue.get(message.guild.id);

    if (!message.member.voice.channel) {
        return message.channel.send('You have to be in a voice channel to stop the music!')
    };
    if (message.member.voice.channel != serverQueue.voiceChannel){
        return message.channel.send('You need to be in my voice channel to stop the music!');
    }
    
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

module.exports.help = {
    name: "stop",
    allias: "parar"
}
