const genChannel = "366488204171411468"; // "chat_geral"

// Say what the user wants in the "#chat_geral" channel
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    let channel = bot.channels.find('id', genChannel);

    // Send the massage in the "#chat_geral"
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => { });
    channel.send(sayMessage);

    return;
}

module.exports.help = {
    name: "mimic",
    allias: "m"
}
