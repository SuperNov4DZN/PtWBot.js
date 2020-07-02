const logChannel = "415204693837348881"; // "mods-log"
const fs = module.require("fs");

// Mute the given member
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

    // Check if the member is trying to mute self or high role
    if (member.id === message.author.id) return message.reply("Você não pode mutar a si mesmo.");
    if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) return message.reply("Você não pode mutar alguem com um cargo maior que você!");

    // Check if the role "mutado" exists, if not create role "mutado"
    let role = message.guild.roles.cache.find(r => r.name === "mutado");
    if (!role) {
        try {
            role = await message.guild.roles.create({
                data: {
                    name: "mutado",
                    color: "#000000",
                    permissions: 67109889
                }
            });

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(role, {
                    'SEND_MESSAGES': false,
                    'SPEAK': false,
                    'ADD_REACTIONS': false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }



    // Check if the member is already muted
    if (member.roles.cache.has(role.id)) return message.reply(`O usuario ${member.user.tag} já está mutado!`);

    bot.mutes[member.id] = {
        guild: message.guild.id,
        time: Date.now() + parseInt(args[1]) * 1000
    }

    // Add the user to the role "mutado", show mute message
    await member.roles.add(role);

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
        if(err) throw err;
        //channel.send(`${member.user.tag} Foi mutador por ${message.author.tag}`);
    });

    return;
}

module.exports.help = {
    name: "mute",
    allias: "mutar",
    description: "Uso: \"!mute <@usuario> <tempo> ou !mute <nome do meliante> <tempo>\" \nMuta o usuario durante o tempo determinando ou indeterminado se o mesmo não for dado."
}
