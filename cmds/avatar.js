// Generates and sends a img of the avatar of the  given member
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    let msg = await message.channel.send("Gerando avatar....");
    
    if(!member.user.displayAvatarURL) return msg.edit("Usuario sem avatar.");

    await message.channel.send({files: [
        {
            attachment: member.user.displayAvatarURL,
            name: "avatar.png"
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "avatar",
    allias: " "
}
