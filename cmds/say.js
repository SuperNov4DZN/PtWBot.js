// Say what the user wants in the same channel as it was requested
module.exports.run = async (bot, message, args) => {
    
    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;
    
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false) || (roleMod ? message.member.roles.cache.has(roleMod) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {
        // Send the message in the same channel
        const sayMessage = args.join(" ");
        message.delete().catch(err => { console.log(err) });
        return message.channel.send(sayMessage);
    }
}

module.exports.help = {
    name: "say",
    allias: "diga",
    description: "Uso: \"!say <mensagem>\" \nEnvia a sua mensagem no chat atual."
}
