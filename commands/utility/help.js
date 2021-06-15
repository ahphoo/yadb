const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 1,
	execute(msg, args) {
        const data = [];
		const { commands } = msg.client;

		if (!args.length) {
			data.push('Available commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can type \`${prefix}help [command name]\` to get info on a specific command!`);

            return msg.reply(data, {split: true})
                .catch(err => {
                    console.error(`Could not send help to ${msg.author.tag}.\n`, err);
                    msg.reply('It seems like I can\'t reply to you! Do you have replies disabled?');
                });

            // TODO: Give option to send help through DM
            // .then(() => {
            //     if (msg.channel.type === 'dm') return;
            //     msg.reply('I\'ve sent you a DM with all my commands!');
            // })
            // .catch(err => {
            //     console.error(`Could not send help DM to ${msg.author.tag}.\n`, err);
            //     msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            // });
		}

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return msg.reply('Sorry, I don\'t know that command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) {
            data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        }
        if (command.description) {
            data.push(`**Description:** ${command.description}`);
        }
        if (command.usage) {
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        }

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        // Split up the reply into two or more messages if the first message exceeds 2000 chars.
        msg.channel.send(data, {split: true});
	},
};