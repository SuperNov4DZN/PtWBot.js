const logChannel = "415204693837348881"; // "mods-log"

// Ban the given member
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }
    
    let member = message.mentions.members.first();
    let channel = bot.channels.fetch(logChannel);

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }
    // Check if the member exists
    if (!member) {
        return message.reply("Por favor mencione um membro válido deste servidor!");
    }

    // Check if the member is bannable
    if (!member.bannable) {
        return message.reply("Eu não posso banir este usuário! O mesmo possui um cargo mais alto ou eu não tenho permissões para banir!")
    }

    // Try to ban, show error message or ban message
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nenhuma razão fornecida";

    await member.ban(reason)
        .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro ${message.user.tag} devido a: ${error}`));
    channel.send(`${member.user.tag} Foi banido por ${message.author.tag} \nMotivo: ${reason}`);

    return;
}

module.exports.help = {
    name: "ban",
    allias: "cinzado",
    description: "Uso: \"!ban <@usuario> ou <nome do meliante>\" \nBane um usuario do servidor."
}
