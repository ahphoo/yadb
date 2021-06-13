module.exports = {
	name: 'prune',
	description: 'Bot deletes a user-specified amount of messages from the channel (1-100)',
	execute(msg, args) {
		if (!args.length) {
            return msg.reply(`Please provide a number between 1 and 100.`);
         }
 
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