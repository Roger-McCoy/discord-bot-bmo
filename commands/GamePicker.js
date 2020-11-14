module.exports = {
    name: 'gamepicker',
    description: "This command will choose a random game from a selection of games. You must play it. Or not.",
    execute(message, args)
    {
        // Consider adding array functionality with add, remove, veto methods and module support later.

        var randomNumber = Math.floor(Math.random() * 8);

        var game;

        if (randomNumber == 0)  // Associates random numbers with the game options and saves as a String var
        {
            game = "<:Praise:767139174377455628> Dark Souls! Praise the Sun! <:bmojam:767139684618338345>";
        }else if (randomNumber == 1)
        {
            game = "<:crosspeepo:767139176356249620> :ghost: Phasmophobia! Spooky. <:bmogasp:767139174385844234>";
        }else if (randomNumber == 2)
        {
            game = "<:8171_Starcraft2:767139174276137041> SC2 - Let's cook their goose. <:bmojam:767139684618338345>";
        }else if (randomNumber == 3)
        {
            game = "<:wololo:768400123893383198> AOEII - Don't point that thing at me! <:bmogasp:767139174385844234>";
        }else if (randomNumber == 4)
        {
            game = "<:mordhau:767139174734102538> Mordhau! Have at them, boys! <:bmojam:767139684618338345> :knife:";
        }else if (randomNumber == 5)
        {
            game = "<:pepecraft:767139175937081364> Minecraft! Check, please. <:bmogasp:767139174385844234> <:Pikamon:767139176045871126>";
        }else if (randomNumber == 6)
        {
            game = ":man_in_manual_wheelchair: :handball: Human Fall Flat! <:bmogasp:767139174385844234>";
        }else if (randomNumber == 7)
        {
            game = "<:hots:776940520995029062> Heroes of the Storm - Good luck! <:bmogasp:767139174385844234><:OWLgg:767139174058819584>";
        }
        
        message.channel.send("<:bmodance:767139684936581120> Who wants to play video games?");
        message.channel.send("I'll pick a game so that you can use your brain power on something else.");
        message.channel.send("Computing . . .");
        message.channel.send("<:bmosat:767139175321174058>");
        message.channel.send("Computing . . .");
        message.channel.send("<:bmosit:767139174385975296>");
        message.channel.send("It's " + game);

    }
}