module.exports = {
    name: 'play',
    description: "This is a play command that will have the bot join the voice channel and play YouTube audio.",
    execute(message, args)
    {
        // Let's us use ytdl in project.
        const ytdl = require("ytdl-core");

        // Create a variable of all the servers where we will hold the queues.
        let servers = {}; // Set equal to an open array.


        function play(connection, message) // Called the function play down below, and passed connection/message.
        {
            var server = servers[message.guild.me.id];

            // This is where you will use ytdl and play & add song into a queue.
            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

            // Shifts the queue.
            server.queue.shift();

            server.dispatcher.on("finish", function()
            {
            if (server.queue[0])
            {
                play(connection, message);
            } else 
            {
                connection.disconnect();
            }
            });
        }

        if (!args[0])
        {
            message.channel.send("You didn't type a link! <:bmogasp:767139174385844234>");
            return;
        } 
        
        if (!message.member.voice.channel)
        {
            message.channel.send("Nobody is in a voice channel! <:bmogasp:767139174385844234> What's the point?");
            return;
        } 
        
        if (!servers[message.guild.me.id]) servers[message.guild.me.id] = {
                    queue: []
        }
        
        // Create a variable for the servers and the server that we're currently on.
        var server = servers[message.guild.me.id]; // Let's us use variable "server" to manage the server that has entered the queue.

        // Push the queue.
        server.queue.push(args[0]);

        // Checks to see if the bot is in voice channel, then joins it if it's not.
        if (!message.guild.me.voice.connection) message.member.voice.channel.join().then(function(connection)
            {
                play(connection, message); // Calls play function from earlier and plays the song.
            })
        module.exports = servers[message.guild.me.id];
    } 
}
