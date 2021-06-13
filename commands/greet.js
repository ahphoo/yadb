module.exports = {
	name: 'greet',
	description: 'Bot greets a mentioned user',
	execute(msg, args) {
        if (!args.length) {
            msg.reply(`No one to greet! Please mention a person after the command (i.e. !greet @foobar)`);
        } else if (!msg.mentions.users.size) {
            return msg.reply('you need to tag a user in order to greet them!');
        }
        
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`Hello ${taggedUser}!`);
	},
};