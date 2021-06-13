module.exports = {
	name: 'server',
	description: 'Bot replies with the name of the server',
	execute(msg, args) {
		msg.reply(`This server's name is: ${msg.guild.name}`);
	},
};