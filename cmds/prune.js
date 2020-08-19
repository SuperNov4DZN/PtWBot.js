// Delay function
function wait(ms) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

// Deletes the number of messages the user wants (2 - 100)
module.exports.run = async (bot, message, args) => {

    let roleAdm = bot.guilds.settings[message.guild.id].adm;
    let roleMod = bot.guilds.settings[message.guild.id].mod;
    
    if (!(message.member.id === message.guild.owner.id || (roleAdm ? message.member.roles.cache.has(roleAdm) : false) || (roleMod ? message.member.roles.cache.has(roleMod) : false))) {

        return message.reply("Desculpe, você não tem permissão para usar isto!");

    } else {

        // Check the amount of messages to delete, if less than 2 or more than 100 show message
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return message.reply("Forneça um número entre 2 e 100 para o número de mensagens a serem excluídas. (Ex.: !apagar <10>)");
        }

        // Try deleting, show error message or delete message
        message.channel.bulkDelete(deleteCount)
            .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));

        const m = await message.channel.send(`Um total de ${deleteCount} mensagens foram apagadas!`);
        wait(3000);
        m.delete();

    }
}

module.exports.help = {
    name: "prune",
    allias: "apagar",
    description: "Uso: \"!prune <n>\" \nApaga n mensagens do chat atual."
}
