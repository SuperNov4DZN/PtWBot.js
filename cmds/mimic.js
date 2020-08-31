// Say what the user wants in the default channel
module.exports.run = async (bot, message, args) => {

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;
    
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false) || (roleMod ? message.member.roles.cache.has(roleMod) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        let channelId = await bot.guilds.settings[message.guild.id].genChannel;
        let channel = bot.channels.cache.find(id => id == channelId);

        // If the set channel is valid, send the message
        if (channel) {
            const sayMessage = args.join(" ");
            message.delete().catch(err => { console.log(err) });
            return channel.send(sayMessage);  
        } else {
            message.reply("O canal padrão não foi encontrado!\nTenha certeza de que o canal foi definido via **!setchat**")
        }
    }
}

module.exports.help = {
    name: "mimic",
    allias: "m",
    description: "Uso \"!mimic <mensagem>\" \nEnvia a mensagem desejada no chat geral (WIP)."
}
