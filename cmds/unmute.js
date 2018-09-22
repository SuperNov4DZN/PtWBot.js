const logChannel = "415204693837348881"; // "mods-log"
const fs = module.require("fs");

// Unmute the given member
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para administrar mensagens!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let channel = bot.channels.find('id', logChannel);

    // Check if the member exists
    if (!member) return message.reply("Por favor mencione um membro válido deste servidor!");

    let role = message.guild.roles.find(r => r.name === "mutado");

    // Check if the member is already unmuted or not muted at all
    if (!role || !member.roles.has(role.id)) return message.reply(`Não foi possivel desmutar o membro ${member.user.tag} pois ele já está desmutado!`);

    // Unmute and show message
    await member.removeRole(role);

    delete bot.mutes[member.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
        console.log(`O membro ${member.user.tag} foi desmutado!`);
        channel.send(`${member.user.tag} Foi desmutado por ${message.author.tag}`);
    });

    return;
}

module.exports.help = {
    name: "unmute",
    allias: "desmutar"
}
