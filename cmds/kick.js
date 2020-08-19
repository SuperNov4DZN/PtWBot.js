// const logChannel = "415204693837348881"; // "mods-log"

// Kick the given member
module.exports.run = async (bot, message, args) => {

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;
    
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false) || (roleMod ? message.member.roles.cache.has(roleMod) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        let member = message.mentions.members.first();
        // let channel = bot.channels.fetch(logChannel);

        if (!member) {
            let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
            member = fetched.first();
        }
        // Check if the member exists
        if (!member) {
            return message.reply("Por favor mencione um membro válido deste servidor!");
        }

        // Check if the member is kickable
        if (!member.kickable) {
            return message.reply("Eu não posso expulsar este usuário! O mesmo possui um cargo mais alto ou eu não tenho permissões para expulsar!");
        }

        // Try to kick, show error message or kick message
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Nenhuma razão fornecida";

        await member.kick(reason)
            .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro ${member.user.tag} devido a: ${error}`));
        // channel.send(`${member.user.tag} Foi kickado por ${message.author.tag} \nMotivo: ${reason}`);
    }
}

module.exports.help = {
    name: "kick",
    allias: "eoq",
    description: "Uso: \"!kick <@usuario> ou <nome do meliante>\" \nRemove um usuario do servidor."
}
