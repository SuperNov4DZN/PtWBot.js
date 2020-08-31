module.exports.run = async (bot, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) {
        return message.channel.send('There is nothing playing.');
    };
	return message.channel.send(`Now playing: **${serverQueue.songs[0].title}**(${serverQueue.songs[0].duration})`);
}

module.exports.help = {
    name: "nowplaying",
    allias: "tocando",
    description: "Uso: \"!nowplaying\" \nMostra a música que está sendo tocada atualmente."
}
