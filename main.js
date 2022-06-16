require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "$";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Running some tests!");
});

client.on("messageCreate", (message) => {
    // Log message from channel
    console.log(`[${message.author.tag}]: ${message.content}`);
    
    if (message.author.id == client.user.id || message[0] != prefix) return;

    message.channel.send("Hello");
});

client.login(process.env.TOKEN);
