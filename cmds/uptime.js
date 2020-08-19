module.exports.run = async (bot, message, args) => {
    // Paste the commands here!
    let uptime = bot.uptime/1000;

    // Hours, minutes and seconds
    let hours = ~~(uptime / 3600);
    let minutes = ~~((uptime % 3600) / 60);
    let seconds = ~~uptime % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let resp = "";

    if (hours > 0) {
        resp += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }

    resp += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    resp += "" + seconds;

    return message.channel.send(`Estou há ${resp} online e contando! :face_with_monocle:`);
}

module.exports.help = {
    name: "uptime",
    allias: "uptime",
    description: "Uso: !uptime\nRetorna o tempo que o bot está online."
}
