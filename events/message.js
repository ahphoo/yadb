const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	execute(msg, client) {
        if (!msg.content.startsWith(prefix) || msg.author.bot) {
            return;
        }
    
        const args = msg.content.slice(prefix.length).trim().split(/\s+/);
        const cmd_name = args.shift().toLowerCase();
    
        const cmd = client.commands.get(cmd_name) 
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd_name));
    
        if (!cmd) return msg.reply(`Invalid command :open_mouth:`);
    
        // Check if this is a server-only command
        if (cmd.guildOnly && msg.channel.type === 'dm') {
            return msg.reply('I can\'t execute that command inside DMs!');
        }
    
        // Check if user has sufficient permissions
        if (cmd.permissions) {
            const authorPerms = msg.channel.permissionsFor(msg.author);
            if (!authorPerms || !authorPerms.has(cmd.permissions)) {
                return msg.reply('You don\'t have permissions to execute this command!');
            }
        }
    
        // Need to set args to true in command file
        if (cmd.args && !args.length) {
            let reply = `You didn't provide any arguments, ${msg.author}!`;
    
            if (cmd.usage) {
                reply += `\nUsage: ${prefix}${cmd_name} ${cmd.usage}`;
            }
    
            return msg.reply(reply);
        }
    
        const {cooldowns} = client;
    
        if (!cooldowns.has(cmd_name)) {
            cooldowns.set(cmd_name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(cmd_name);
        const cooldown_amount = (cmd.cooldown || 3) * 1000;
    
        // Check if this user has used the command and if cooldown has expired
        if (timestamps.has(msg.author.id)) {
            const expiration_time = timestamps.get(msg.author.id) + cooldown_amount;
    
            const time_left = (expiration_time - now) / 1000;
            return msg.reply(`please wait ${time_left.toFixed(1)} more second(s) before reusing the \`${cmd_name}\` command.`);
        }
    
        timestamps.set(msg.author.id, now);
        setTimeout(() => timestamps.delete(msg.author.id), cooldown_amount);
    
        try {
            cmd.execute(msg, args);
        } catch (err) {
            console.error(err);
            msg.reply('there was an error trying to execute that command!');
        }
    
        console.log(msg.content);
	},
};