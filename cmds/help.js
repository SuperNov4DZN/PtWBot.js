let Discord = module.require("discord.js");
let fs = module.require("fs");

// Show all the commands and how to use'em
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Atualmente não temos nenhum comando voltado a \"membros\", apenas staff!")
    }

    const embed = new Discord.MessageEmbed()

        // .setDescription("!ping [Mostra a latência atual]\n"
        //     + "!diga ou say <mensagem> [Escreve a mensagem que você digitar]\n"
        //     + "!apagar ou prune <n> [Deleta o numero x de mensagens]\n"
        //     + "!kick <membro> <razão> [Expulsa um membro do servidor]\n"
        //     + "!ban <membro> <razão> [Bane um membro do servidor]\n"
        //     + "!infousuario ou userinfo <membro> [Mostra as informações do usuario]\n"
        //     + "!mutar ou mute <membro> [Impede um usuario de digitar/falar]\n"
        //     + "!desmutar ou unmute <membro> [Permite o usuario a digitar/falar novamente]\n"
        //     + "!ajuda, ? ou help [Mostra essa mensagem]");

        // Set the title of the embed
        .setTitle('AJUDA | HELP')

        // Set the description of the embed
        .setDescription("Informações sobre todos os comandos disponíveis!")

        // Set the color of the embed
        .setColor(0x2196F3);
    
	const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
        const command = require(`./${file}`);
        // Adding a field for each command with its\n name and description
		embed.addField(command.help.name, command.help.description);
	}

    // Send the embed as dm message
    message.reply("Estou enviando todos os comandos para você!");
    await message.author.send(embed);

    return;
}

module.exports.help = {
    name: "help",
    allias: "ajuda",
    description: "Uso: \"!help\" \nMostra esta mensagem."
}
