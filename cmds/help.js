let Discord = module.require("discord.js"); // Mudar o embed do comando help para ficar igual o do userinfo!

// Show all the commands and how to use'em
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.some(r => ["⟸❖ DONO ❖⟹", "✚ ADM ✚", "♦ MOD ♦"].includes(r.name))) {
        return message.reply("Atualmente não temos nenhum comando voltado a \"membros\", apenas staff!")
    }

    const embed = new Discord.RichEmbed()

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
        .setColor(0x2196F3)

        // Set the main content of the embed
        .addField("!ping", "Uso: \"!ping\" Mostra a latência atual.")
        .addField("!say", "Uso: \"!say <mensagem>\" Escreve a mensagem que você digitar.")
        .addField("!kick", "Uso: \"!kick <@usuario> ou <id>\" Remove um usuario do servidor.")
        .addField("!ban", "Uso: \"!ban <@usuario> ou <id>\" Bane um usuario do servidor.")
        .addField("!userinfo", "Uso: \"!userinfo <@usuario> ou <id>\" Mostra algumas informações do usuario.")
        .addField("!mute", "Uso: \"!mute <@usuario> ou <id> <tempo>\" Muta o usuario durante o tempo determinando ou indeterminado se o mesmo não for dado.")
        .addField("!unmute", "Uso: \"!unmute <@usuario> ou <id>\" Desmuta o usuario.")
        .addField("!help", "Uso: \"!help\" Mostra essa mensagem.");


    // Send the embed as dm message
    message.reply("Estou enviando todos os comandos para você!")
    await message.author.send(embed);

    return;
}

module.exports.help = {
    name: "help",
    allias: "ajuda"
}
