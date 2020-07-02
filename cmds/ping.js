// Show the API and bot ping
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(bot.ping)}ms `)

    return;
}

module.exports.help = {
    name: "ping",
    allias: " ",
    description: "Uso: \"!ping\" \nMostra a latência atual."
}
