module.exports = {
	name: 'ping',
	description: 'Bot replies with "pong"',
	execute(msg, args) {
		msg.reply('pong');
	},
};