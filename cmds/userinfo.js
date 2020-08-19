let Discord = module.require("discord.js");

// Show info of the given member
module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first();

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }
    
    // Create embed and set the main content
    let embed = new Discord.MessageEmbed()
        .setAuthor(member.displayName, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(0x5400A7)
        .addField("Nickname", member.user.tag, true)
        .addField("Status", member.user.presence.status, true)
        .addField("ID", member.user.id, true);

    if (!member.user.presence.activities[0]) {
        embed.addField("Mention", message.author, true)
            .addField("Entrou em", member.joinedAt);
    } else {
        embed.addField(member.user.presence.activities[0].type, member.user.presence.activities[0].name, true)
            .addField("Mention", message.author, true)
            .addField("Entrou em", member.joinedAt);
    }

    // Send the embed to the same channel as the message
    return message.channel.send({embed: embed});
    
}

module.exports.help = {
    name: "userinfo",
    allias: "infousuario",
    description: "Uso: \"!userinfo <@usuario> ou <nome do meliante>\" \nMostra algumas informações do usuario."
}
