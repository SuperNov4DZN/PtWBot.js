const fs = module.require("fs");
// Binds a guild roleId into adm, mod or dj level permissions on the bot
module.exports.run = async (bot, message, args) => {

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    // Checks if the user is the guild owner or has admin level permissions on the bot
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        let role = message.mentions.roles.first();

        if (!bot.guilds.settings[message.guild.id]) {
            
            const settingsConstruct = {
                adm: null,
                mod: null,
                dj: null,
                genChat: null
            }

            bot.guilds.settings[message.guild.id] = settingsConstruct;
        }

        if (args[0] === "adm") {

            bot.guilds.settings[message.guild.id].adm = role.id;

            message.channel.send("O cargo mencionado agora tem o nível administrador");

        } else if (args[0] === "mod") {
            bot.guilds.settings[message.guild.id].mod = role.id;
            message.channel.send("O cargo mencionado agora tem o nível moderador");
        } else {
            message.channel.send("Desculpe, não entendi. Tenha certeza de primeiro digitar o nível de permissão e depois marcar o cargo! (Ex.: !setrole <mod> <@role>)");
        }
        
        fs.writeFile("./guildsettings.json", JSON.stringify(bot.guilds.settings, null, 4), err => {
            if(err) throw err;
        });
    }
}

module.exports.help = {
    name: "setrole",
    description: "Uso: \"!setrole < adm || mod > 'cargo' \" \nVincula um cargo existente as permissões selecionadas."
}
