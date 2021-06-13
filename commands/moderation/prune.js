module.exports = {
	name: 'prune',
    args: true,
    usage: '<num> (num is a number between 1 and 100)',
	description: 'Bot deletes a user-specified amount of messages from the channel (1-100)',
	execute(msg, args) {
         // Prune the current message as well
         const amount = parseInt(args[0]) + 1;
 
         if (isNaN(amount)) {
             return msg.reply('that doesn\'t seem to be a valid number.');
         } else if (amount < 1 || amount > 100) {
             return msg.reply('you need to input a number between 1 and 100.');
         }
 
         msg.channel.bulkDelete(amount);
	},
};