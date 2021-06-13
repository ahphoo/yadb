module.exports = {
	name: 'beep',
	description: 'Bot replies with "boop"',
	execute(msg, args) {
		msg.reply('boop');
	},
};