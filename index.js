const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/\s+/);
    const cmd_name = args.shift().toLowerCase();

    if (!client.commands.has(cmd_name)) {
        return msg.reply(`Invalid command :open_mouth:`);
    }

    const cmd = client.commands.get(cmd_name);

    try {
        cmd.execute(msg, args);
    } catch (err) {
        console.error(error);
		message.reply('there was an error trying to execute that command!');
    }

    console.log(msg.content);
});

//client.login(process.env.TOKEN);  Login using TOKEN stored in environment variable
client.login(token);