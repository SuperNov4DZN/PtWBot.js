const fs = module.require("fs");
// Binds a guild channelId into the default text channel that the bot will speak
module.exports.run = async (bot, message, args) => {

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    // Checks if the user is the guild owner or has admin level permissions on the bot
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        let chat = message.mentions.channels.first();

        if (!bot.guilds.settings[message.guild.id]) {
            
            const settingsConstruct = {
                adm: null,
                mod: null,
                dj: null,
                genChannel: null
            }

            bot.guilds.settings[message.guild.id] = settingsConstruct;
        }

        if (!chat) {
            return message.reply("Desculpe, não entendi. Tente mencionar um canal válido deste servidor");
        }

        bot.guilds.settings[message.guild.id].genChannel = chat.id;
        
        fs.writeFile("./guildsettings.json", JSON.stringify(bot.guilds.settings, null, 4), err => {
            if(err) throw err;
        });
    }
}

module.exports.help = {
    name: "setchat",
    description: "Uso: \"!setchat <#channel>\" \nDá acesso a um chat existente ao bot. Este chat será tratado como chat geral e receberá as mensagens do mimic."
}
