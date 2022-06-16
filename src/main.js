require("dotenv").config();


const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const fs = require('fs');

const prefix = "$";

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Call upon Discord launch
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Running some tests!");
});

// Intake messages in Discord channel
client.on("messageCreate", (message) => {
    // Log message from channel
    console.log(`[${message.author.tag}]: ${message.content}`);
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`Command: ${command}`);
    console.log(`Text: ${args}`);
    
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        message.reply('Unknown command, sorry!');
    }
});

client.login(process.env.TOKEN);
