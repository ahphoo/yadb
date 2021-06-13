module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Bot replies with "pong"',
	execute(msg, args) {
		msg.reply('pong');
	},
};