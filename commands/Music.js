module.exports = {
    name: 'music',
    description: "This is a music command that will play/skip/stop youtube video links.",
    execute(message, args)
    {
        // Let's us use ytdl in project.
        const ytdl = require("ytdl-core");

        // Create a variable of all the servers where we will hold the queues.
        var servers = {}; // Set equal to an open array.

        //console.info(message);
        console.info(args[0]);
        console.info(args[1]);
        switch (args[0])
        {
            case 'play':

            function play(connection, message) // Called the function play down below, and passed connection/message.
            {
                var server = servers[message.guild.me.id];

                // This is where you will use ytdl and play & add song into a queue.
                if (!server.queue[1]) { //
                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                // Shifts the queue.
                //server.queue.shift();

                server.dispatcher.on("finish", function()
                {
                // Shifts the queue.  //
                server.queue.shift(); //
                if (server.queue[0])
                {
                    play(connection, message);
                } else 
                {
                    //connection.disconnect();
                    server.queue.push(args[1]); //
                }
                });
                }
            }

            if (!args[1])
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
            server.queue.push(args[1]);

            // Checks to see if the bot is in voice channel, then joins it if it's not.
            if (!message.guild.me.voice.connection) message.member.voice.channel.join().then(function(connection)
                {
                    play(connection, message); // Calls play function from earlier and plays the song.
                })
            break;
     
            case 'skip':

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send("Let's skip that one! <:bmogasp:767139174385844234>")
            break;
        
            case 'stop':

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
}
