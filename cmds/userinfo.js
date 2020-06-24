let Discord = module.require("discord.js");

// Show info of the given member
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.cache.some(r=>["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    let member = message.mentions.members.first();

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }
    
    // Create embed and set the main content
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setThumbnail(member.user.displayAvatarURL())
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
