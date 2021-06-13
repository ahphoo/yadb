module.exports = {
	name: 'greet',
    args: true,
    usage: '@foobar',
	description: 'Bot greets a mentioned user',
	execute(msg, args) {
        // Refactor this message
        if (!msg.mentions.users.size) {
            return msg.reply('you need to tag a user in order to greet them!');
        }
        
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`Hello ${taggedUser}!`);
	},
};