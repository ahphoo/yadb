module.exports = {
	name: 'user-info',
	description: 'Bot replies with username and id',
	execute(msg, args) {
		msg.reply(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
	},
};