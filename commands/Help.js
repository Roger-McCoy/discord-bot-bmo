module.exports = {
    name: 'help',
    description: "This is a help command that will list the bot's various commands for users.",
    execute(message, args)
    {
        message.channel.send("Hello there! <:bmodance:767139684936581120> I'm BMO. Here are some of the things I like to do: \n!ping\n!play YouTube-URL-here\n!skip\n!stop\n!gamepicker\nType !help to see these options again. I may have secret commands, too!");
    }
}