// ---- Roger McCoy. 
// ---- Updated older code for Discord.js v12 - 10/21/2020
// ---- Updated packages & ytdl-core for 3.4.2 ("npm list ytdl-core" to check version in terminal, or "npm update" to update all packages!) - 11/13/2020
// ---- Added a config.json file and a .gitignore file to hide the private token before uploading to git - 11/14/2020
// ---- In process of converting play/skip/stop from lengthy if else statements into their own individual modules (js files).
// ---- Main.js starting handler skeleton, Ping.js, and part of play/skip/stop functionality are adapted from CodeLyon's various Youtube tutorial series. 
// ---- Other commands, like and GamePicker.js and Help.js, are original creations.
// ---- Excess comments for learning purposes, as this was my first discord bot and foray into JavaScript.

// First we will create a constant that will require discord.js
const Discord = require('discord.js'); // How we get discord.js to communicate with our node modules.

// Lets us use ytdl in the project.
const ytdl = require("ytdl-core");

// Lets us use our config file in the project.
const config = require("./config.json");

// Create a variable of all the servers where we will hold the queues.
var servers = {}; // Set equal to an open array.

// Create a new client using discord.js
const client = new Discord.Client(); // Our bot, created as a client.

// ready is our event, arrow function (a function passing through here(?))
client.once('ready', () => {
    console.log('BMOBot is online!') // Tells the console that our bot is online.
});


// --ADVANCED METHOD FOR CUSTOM COMMANDS--
// Create a require, b/c we're going to require a fs to get into other javascript files.
const fs = require('fs');

// Create a discord collection where we can have all of our commands stored.
client.commands = new Discord.Collection();

// Ensure that the files we're reading are javascript files.
// Create a command folder in your directory, and go into it on the next line.
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Loop through the files to find the correct file to execute our commands.
for (const file of commandFiles) 
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command); // Passes in command name and command.
}
// Then just create your command javascript files (For example: "Ping.js").


// --A BASIC METHOD FOR CUSTOM COMMANDS--
// --CODE ALSO USED BY ADVANCED METHOD--
// Code-in prefix (The symbol that tells a discord bot that they are initializing a command)
const prefix = '!';

// Code for an event:
client.on('message', message => {
    // We have to check two things. First, if the message started with the prefix. Second, if the bot itself initiated the command.
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignores and returns if not a bot command or written by the bot.

    // Adds splice/space.
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping')
    {
        // message.channel.send('pong!'); // If basic, you'd just write code here. If advanced, type the following to access your file:
        client.commands.get('ping').execute(message, args);
    } else if (command === 'help')
    {
        client.commands.get('help').execute(message, args);
    } else if (command === 'favoritevideo')
    {
        message.channel.send('This is my favorite! https://www.youtube.com/watch?v=IXSbswsfWgw')

    // ---------- MUSIC PLAYER CODE --------------------------------------------------------------------------------------------------
    } else if (command === 'play') 
    {
        //client.commands.get('play').execute(message, args);
        
        // Create a function that plays the link.
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

    } else if (command === 'skip')
    {
        //client.commands.get('skip').execute(message, args);
        var server = servers[message.guild.me.id];
        if (server.dispatcher) server.dispatcher.end(); 
        message.channel.send("Let's skip that one! <:bmogasp:767139174385844234>")

    } else if (command === 'stop')
    {
        //client.commands.get('stop').execute(message, args);
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
    // -----END OF MUSIC PLAYER CODE ----------------------------------------------------------------------------------------------------
    } else if (command === 'gamepicker')
    {
        client.commands.get('gamepicker').execute(message, args);
    } // More if else statement commands to go here.
})



// node . // To turn bot on in cmd while inside your project folder(navigate with cd desktop etc).
// OR
// node main.js
// OR either command in the terminal window of Visual Studios Code.
// ctrl + c to exit process in cmd and take bot offline


// (First set up New Application on https://discord.com/developers/applications & convert it into a bot(Add Bot))
// It will give you a token (Basically a password that allows the app that we're coding to communicate with the discord app on dev portal)
// Then go ahead & give the bot permissions for everything it'd theoretically need on https://discordapi.com/permissions.html
// On that same website, enter bot client ID and get a link to add the bot to a server.
// Log into our discord bot (w/ private token):
client.login(config.token); // !!! This should be the last line of your file !!!