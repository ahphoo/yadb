const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
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

    // Check if this is a server-only command
    if (cmd.guildOnly && msg.channel.type === 'dm') {
        return msg.reply('I can\'t execute that command inside DMs!');
    }

    // Need to set args to true in command file
    if (cmd.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (cmd.usage) {
            reply += `\nUsage: ${prefix}${cmd_name} ${cmd.usage}`;
        }

        return msg.reply(reply);
    }

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