// Generates and sends a img of the avatar of the  given member
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.cache.some(r=>["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }

    let member = message.mentions.members.first();

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }

    let msg = await message.channel.send("Gerando avatar....");
    
    if(!member.user.displayAvatarURL()) return msg.edit("Usuario sem avatar.");

    await message.channel.send({files: [
        {
            attachment: member.user.displayAvatarURL(),
            name: "avatar.png"
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "avatar",
    allias: " ",
    description: "Uso \"!avatar <@usuario> ou <nome do meliante>\" \nEnvia o avatar do usuário desejado no chat."
}
