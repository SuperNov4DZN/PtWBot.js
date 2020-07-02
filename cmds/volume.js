module.exports.run = async (bot, message, args) => {
    try {
        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);

        const voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            return message.channel.send("I'm not playing anything currently");
        }

        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to change the volume");
        }

        if (isNaN(args[0])) {
            return message.channel.send("Invalid argument, please input a value in between 1~100");
        }

        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume/100);
    } catch (error) {
        console.log(error);
        message.channel.send(error.message);
    }
}

module.exports.help = {
    name: "volume",
    allias: "volume",
    description: "Uso: \"!volume <n>\" \nAltera o volume de reprodução da música (0~100)."
}
