This file contains various notes I've made during creation and upkeep of this bot.
It's not a typical user readme file.

// ---- Roger McCoy. 
// ---- Updated older code for Discord.js v12 - 10/21/2020
// ---- Updated packages & ytdl-core for 3.4.2 ("npm list ytdl-core" to check version in terminal, or "npm update" to update all packages!) - 11/13/2020
// ---- Added a config and gitignore file to hide the private token before uploading to git - 11/14/2020
// ---- In process of converting play/skip/stop from lengthy if else statements into their own individual modules (js files).
// ---- Main.js starting handler skeleton, Ping.js, and part of play/skip/stop functionality are adapted from CodeLyon's various Youtube tutorial series. 
// ---- Other commands, like and GamePicker.js and Help.js, are original creations.
// ---- Excess comments for learning purposes, as this was my first discord bot and foray into JavaScript.

// cmd line commands that got us this far:
// npm init // Creates package.json file for us and accepts name/description input.
// code . // After pathing set up, opens Visual Studio Code in file location.
// npm install discord.js // Installs all of the modules that we need to code discord bots (Sort of like a framework).
// npm install --save ytdl-core opusscript // Installs modules/packages for the music player.
// After setting this stuff up, we created our main.js file.

// node . // To turn bot on in cmd in that folder.



For the music command, you will need to enter this in terminal:
npm install --save ytdl-core opusscript

music.js
&
play.js, skip.js, & stop.js are incomplete attempts at converting the music bot functionality into separate modules.