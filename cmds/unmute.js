const logChannel = "415204693837348881"; // "mods-log"
const fs = module.require("fs");

// Unmute the given member
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para administrar mensagens!");

    let member = message.mentions.members.first();
    //let channel = bot.channels.fetch(logChannel);

    if (!member) {
        let fetched = await message.guild.members.fetch({query: args[0], limit: 1});
        member = fetched.first();
    }
    // Check if the member exists
    if (!member) return message.reply("Por favor mencione um membro válido deste servidor!");

    let role = message.guild.roles.cache.find(r => r.name === "mutado");

    // Check if the member is already unmuted or not muted at all
    if (!role || !member.roles.cache.has(role.id)) return message.reply(`Não foi possivel desmutar o membro ${member.user.tag} pois ele já está desmutado!`);

    // Unmute and show message
    await member.roles.remove(role);

    delete bot.mutes[member.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
        console.log(`O membro ${member.user.tag} foi desmutado!`);
        //channel.send(`${member.user.tag} Foi desmutado por ${message.author.tag}`);
    });

    return;
}

module.exports.help = {
    name: "unmute",
    allias: "desmutar",
    description: "Uso: \"!unmute <@usuario> ou <id>\" \nDesmuta o usuario."
}
