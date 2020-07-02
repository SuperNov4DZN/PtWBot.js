// Say what the user wants in the same channel
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    // Send the message in the same channel
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => { });
    message.channel.send(sayMessage);

    return;
}

module.exports.help = {
    name: "say",
    allias: "diga",
    description: "Uso: \"!say <mensagem>\" \nEscreve a mensagem que você digitar."
}
