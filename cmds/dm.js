// Send a dm message to the given member
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Desculpe, você não tem permissão para usar isto!");
    }
 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(member == null) return;
    message.delete();
    mentionMessage = message.content.slice(3);
    member.send(mentionMessage + "\n Não responda essa mensagem.. A não ser que queira falar sozinho kkk");
    message.channel.send(`Uma dm foi enviada para o usuario ${member.user.tag}!`);
}

module.exports.help = {
    name: "dm",
    allias: "dm"
}
