const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {

    let role = message.mentions.roles.first();

    if (!bot.guilds.settings[message.guild.id]) {
        
        const settingsConstruct = {
            adm: null,
            mod: null,
            dj: null

        }

        bot.guilds.settings[message.guild.id] = settingsConstruct;
    }

    if (args[0] === "adm") {

        bot.guilds.settings[message.guild.id].adm = role.id;

        message.channel.send(":fire: Deu certo :fire:");

    }

    if (args[0] === "mod") {
        bot.guilds.settings[message.guild.id].mod = role.id;
        message.channel.send(":fire: Deu certo :fire:");
    }
    
    fs.writeFile("./guildsettings.json", JSON.stringify(bot.guilds.settings, null, 4), err => {
        if(err) throw err;
    });
    
}

module.exports.help = {
    name: "setrole",
    description: "Uso: \"!setrole < adm || mod > 'cargo' \" \nVincula um cargo existente as permissões selecionadas."
}
