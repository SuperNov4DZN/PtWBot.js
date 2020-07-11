module.exports.run = async (bot, message, args) => {
    const serverQueue = bot.queue.get(message.guild.id);

    if (!message.member.voice.channel) {
        return message.channel.send('You have to be in a voice channel to stop the music!')
    };
    if (message.member.voice.channel != serverQueue.voiceChannel){
        return message.channel.send('You need to be in my voice channel to stop the music!');
    }
    
    serverQueue.songs = [];
    // Precisamos descobrir o que está provocando o erro que torna o dispatcher "null"
    try {
        serverQueue.connection.dispatcher.end();
    } catch (err) {
        console.log(serverQueue);
        bot.queue.delete(guild.id);
        console.log(err);
    }
}

module.exports.help = {
    name: "stop",
    allias: "parar",
    description: "Uso: \"!stop\" \nPara de tocar música."
}
