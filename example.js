const dotenv = require('dotenv');
dotenv.config();

const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
    console.log(msg.content)
});

//client.login(process.env.TOKEN);  Login using TOKEN stored in environment variable
client.login(config.token);