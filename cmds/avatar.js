let Discord = module.require("discord.js");
// Generates and sends a img of the avatar of the  given member
module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first();

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }

    if (!member) return message.channel.send("Usuário não encontrado.\nPor favor mencione um usuário válido deste servidor");

    let msg = await message.channel.send("Gerando avatar....");
    let image = member.user.displayAvatarURL({size: 1024});

    let embed = new Discord.MessageEmbed();

    embed.setTitle(member.displayName).setImage(image).setColor(0x5400A7);

    message.channel.send(embed);

    msg.delete();
}

module.exports.help = {
    name: "avatar",
    allias: " ",
    description: "Uso \"!avatar <@usuario> ou <nome do meliante>\" \nEnvia o avatar do usuário desejado no chat."
}
