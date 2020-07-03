let Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const queue = bot.queue;
    const serverQueue = queue.get(message.guild.id);

    let embed = new Discord.MessageEmbed().setTitle("Fila | Queue").setColor(0x2196F3);
    let description = "";
    let i = 0;

    if (!serverQueue) {
        return message.channel.send('There is nothing playing');
    }

    serverQueue.songs.forEach(song => {
        if (i === 0) {
            description = `:loud_sound: **- ${song.title}** (${song.duration})\n`;
        } else {
            description = description + `**${i} - ${song.title}** (${song.duration})\n`;
        }
        i += 1;
    });

    embed.setDescription(description);

    return message.channel.send(embed);
}

module.exports.help = {
    name: "queue",
    allias: "fila",
    description: "Uso: \"!queue\" \nMostra a música atual e o estado da fila."
}
