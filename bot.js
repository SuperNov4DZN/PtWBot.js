const config  = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const Client = require("./client/client.js");

const prefix = config.prefix;

const bot = new Client();

bot.mutes = require("./mutes.json");

// Read the "cmds" file and display the commands
fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Show a message when the bot starts
bot.on("ready", () => {
    console.log(`Bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais, em ${bot.guilds.cache.size} servidores.`);
    bot.user.setActivity(`Helper PTW Official em ${bot.guilds.cache.size} servidores`);

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "mutado")
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} agora pode ser desmutado!`);

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                    console.log(`O membro ${member.user.tag} foi desmutado!`)
                    
                });
            }
        }
    }, 5000);
});

// Update the bot status if he's added to any guild
bot.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    bot.user.setActivity(`Helper PTW Official em ${bot.guilds.size} servidores`);
});

// Update the bot status if he's removed from any guild
bot.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Helper PTW Official em ${bot.guilds.sizer} servidores`);
});

// Read and run commands
bot.on("message", async message => {

    // If the command comes from another bot don't reply
    if(message.author.bot) return;

    // If the message is "dm" only reply to the role "⟸❖ DONO ❖⟹"
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // If the command dont start with the right prefix dont reply 
    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

    // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // const comando = args.shift().toLowerCase();

});

bot.login(config.token);
