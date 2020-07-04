// Send a dm message to the given member
module.exports.run = async (bot, message, args) => {

    // !message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚"].includes(r.name))
    // r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))
    //console.log(`Id do corno: ${message.member.id}    Id do furry: ${message.guild.owner.id}`);

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;

    if (!(((message.member.id) === (message.guild.owner.id)) || roleAdm ? message.member.roles.cache.has(roleAdm) : false || roleMod ? message.member.roles.cache.has(roleMod) : false)) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    }

    let member = message.mentions.members.first();

    if (!member) {

        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();

    }

    if(member == null) return;

    message.delete();
    mentionMessage = message.content.slice(3);
    member.send(mentionMessage + "\n Não responda essa mensagem.. A não ser que queira falar sozinho kkk");
    message.channel.send(`Uma dm foi enviada para o usuario ${member.user.tag}!`);
    return;

}

module.exports.help = {
    name: "dm",
    allias: "dm",
    description: "Uso: \"!dm <@usuario> ou !dm <nome do meliante>\" \nEnvia uma mensagem na dm do meliante."
}
