module.exports = {
    name: 'stop',
    description: "This is a stop command that will stop the play queue.",
    execute(message, args)
    {
        // Let's us use ytdl in project.
        const ytdl = require("ytdl-core");

        var servers = require('./play');


        var server = servers[message.guild.me.id];
        if (message.guild.me.voice.connection) {
            for (var i = server.queue.length - 1; i >= 0; i--){
                server.queue.splice(i,2);
            }
            server.dispatcher.end();
            message.channel.send("Okay, I stopped the song queue for now. <:bmogasp:767139174385844234>")
            console.log('The queue has been stopped.')
        }

        if (message.guild.me.connection) message.guild.me.voice.connection.disconnect();
    }
}