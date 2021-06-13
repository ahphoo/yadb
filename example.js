const dotenv = require('dotenv');
dotenv.config();

const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();

    if (cmd === `ping`) {
        msg.reply('pong');
    } else if (cmd === `beep`) {
        msg.reply('boop');
    } else if (cmd === `server`) {
        msg.reply(`This server's name is: ${msg.guild.name}`);
    } else if (cmd === `user-info`) {
		msg.reply(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
	} else if (cmd === `greet`) {
        if (!args.length) {
            msg.reply(`No one to greet! Please mention a person after the command (i.e. !greet @foobar)`);
        } else if (!msg.mentions.users.size) {
            return msg.reply('you need to tag a user in order to greet them!');
        }
        
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`Hello ${taggedUser}!`);
    } else if (cmd === `avatar`) {
        if (!msg.mentions.users.size) {
            return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
        }
        
        const avatarList = msg.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`
        });

        msg.channel.send(avatarList);
    } else if (cmd === `prune`) {
        if (!args.length) {
           return msg.reply(`Please provide a number between 1 and 100.`);
        }

        // Prune the current message as well
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return msg.reply('that doesn\'t seem to be a valid number.');
        } else if (amount < 1 || amount > 100) {
            return msg.reply('you need to input a number between 1 and 100.');
        }

        msg.channel.bulkDelete(amount);
    } else {
        msg.reply(`Invalid command :open_mouth:`);
    }

    console.log(msg.content);
});

//client.login(process.env.TOKEN);  Login using TOKEN stored in environment variable
client.login(token);