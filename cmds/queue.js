module.exports.run = async (bot, message, args) => {
    const queue = bot.queue;
    const serverQueue = queue.get(message.guild.id);

    let queueResponse = "";

    if (!serverQueue) {
        return message.channel.send('There is nothing playing');
    }

    queueResponse = `This queue has ${serverQueue.songs.length} songs!\n\`\`\`diff\n`

    serverQueue.songs.forEach(song => {
        queueResponse = queueResponse + `+ ${song.title}` + '\n';
    });
    queueResponse = queueResponse + "```";
    return message.channel.send(queueResponse);
}

module.exports.help = {
    name: "queue",
    allias: "fila"
}
