let Discord = module.require("discord.js");
let fs = module.require("fs");

// Show all the commands and how to use'em
module.exports.run = async (bot, message, args) => {
    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;
    
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false) || (roleMod ? message.member.roles.cache.has(roleMod) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        const embed = new Discord.MessageEmbed()

            // Set the title of the embed
            .setTitle('AJUDA | HELP')

            // Set the description of the embed
            .setDescription("Informações sobre todos os comandos disponíveis!")

            // Set the color of the embed
            .setColor(0x5400A7);
        
        const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            // Adding a field for each command with its\n name and description
            embed.addField(command.help.name, command.help.description);
        }

        // Send the embed as dm message
        message.reply("Estou enviando todos os comandos para você!");
        await message.author.send(embed);
    }
}

module.exports.help = {
    name: "help",
    allias: "ajuda",
    description: "Uso: \"!help\" \nMostra esta mensagem."
}
