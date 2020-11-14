module.exports = {
    // This is where we keep information about our commands.
    name: 'ping',
    description: "This is a ping command.",
    execute(message, args)
    {
        // This is where you'll put most of the command's actual code.
        message.channel.send('pong!');
        // You'd then still access this code from the main.js file and the nested if statements.
    }
}