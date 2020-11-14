module.exports = {
    name: 'skip',
    description: "This is a skip command that will skip the next song in the play queue.",
    execute(message, args)
    {
        // Let's us use ytdl in project.
        const ytdl = require("ytdl-core");

        // Create a variable of all the servers where we will hold the queues.
        const servers = require('./play');
        //var servers = play.servers;

        console.info(servers);

        var server = servers[message.guild.me.id];
        if (servers.dispatcher) servers.dispatcher.end();
        message.channel.send("Let's skip that one! <:bmogasp:767139174385844234>")
    }
}