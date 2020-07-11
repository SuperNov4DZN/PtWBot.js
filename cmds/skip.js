module.exports.run = async (bot, message, args) => {
    const serverQueue = bot.queue.get(message.guild.id);

    if (!serverQueue) {
        return message.channel.send('There is no song that I could skip!')
    };
	if (!message.member.voice.channel) {
        return message.channel.send('You have to be in a voice channel to skip the music!')
    };
    if (message.member.voice.channel != serverQueue.voiceChannel){
        return message.channel.send('You need to be in my channel to skip musics!');
    }
    if (!isNaN(args[0]) && args[0] < serverQueue.songs.length) {
        serverQueue.songs.splice(0, args[0]-1);
    }
    // Precisamos descobrir o que está provocando o erro que torna o dispatcher "null"
    try {
        serverQueue.connection.dispatcher.end();
    } catch (err) {
        console.log(serverQueue);
        bot.queue.delete(guild.id);
        console.log(err);
        message.channel.send("Something unexpected ocurred and your queue was cleared!");
    }
}

module.exports.help = {
    name: "skip",
    allias: "pular",
    description: "Uso: \"!skip ou !skip <n>\" \nPula a música atual ou n músicas."
}
