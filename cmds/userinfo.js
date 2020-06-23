let Discord = module.require("discord.js");

// Show info of the given member
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.cache.some(r=>["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    // Create embed and set the main content
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setThumbnail(member.user.avatarURL)
        .setDescription(`Informações do usuario \n${member.user.username}!`)
        .setColor("#5400A7")
        .addField("Nick completo", member.user.tag)
        .addField("ID", member.user.id)
        .addField("Entrou em", member.user.createdAt);

    // Send the embed to the same channel as the message
    message.channel.send({embed: embed});

    return;
}

module.exports.help = {
    name: "userinfo",
    allias: "infousuario"
}
