const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const problemUrlBase = 'https://leetcode.com/problems/';

module.exports = {
	name: 'problem',
	description: 'Bot replies with random leetcode problem',
    usage: '[ easy | medium | hard ]',
	execute(msg, args, client, allProblems, freeProblems, paidProblems) {
        difficulty = ['easy', 'medium', 'hard'];
        costs = ['free', 'paid'];

        if (!args.length) {
            return problemType(allProblems, msg, difficulty[getRandomInt(difficulty.length)]);
        }

        if (difficulty.indexOf(args[0]) >= 0) {
            diff = args[0];
        }

        if (args.length > 1 && costs.indexOf(args[1]) >= 0) {
            cost = args[1];
        }

        if (args[0] === 'info') {
            msg.channel.send(
                `Leetcode currently has a total of ${allProblems.length} problems of which ${freeProblems.length} are free, and ${paidProblems.length} are paid.`,
            );
        } else if (args[0] === 'help') {
            msg.channel.send(
                '```Usage:\n\n\t!problem (without args) - gives you a random problem of any difficulty either paid/free.' +
                '\n\n\t!problem free - gives you a random freely accessible problem of any difficulty.' +
                '\n\n\t!problem paid - gives you a random paid/locked problem of any difficulty.' +
                '\n\nYou can also add difficulty modifiers:\n\n\t!problem <easy | medium | hard> <free | paid> - lets you pick a random free or paid problem of the chosen difficulty.```',
            );
        } else if (cost === 'free') {
            problemType(freeProblems, msg, diff);
        } else if (cost === 'paid') {
            problemType(paidProblems, msg, diff);
        } else {
            problemType(allProblems, msg, diff);
        }
	},
};


/**
 * Creates an embed message with the relevant info about the problem.
 * @param {*} data
 * @param {*} msg
 * @param {string} diff
 */
 function problemType(data, msg, diff = '') {
	if (diff != '') {
		const filteredByDiff = data.filter((problem) => problem.difficulty.toLowerCase() === diff);
		data = filteredByDiff;
	}
	const dataLen = data.length;
	const randProblem = getRandomInt(dataLen);
	const aProblem = data[randProblem];
	const problemUrl = problemUrlBase + aProblem.titleSlug + '/';

    const attachment = new Discord.MessageAttachment('images/LeetCode_logo_rvs.png', 'logo.png');

	const embed = new MessageEmbed()
		.setTitle(aProblem.title)
		.setColor('#f89f1b')
        .attachFiles(attachment)
		.setImage('attachment://logo.png')
		// ToDo Scrape problem descriptions, add to object and embed (haHA might not do this)
		.setDescription(`${aProblem.difficulty} ${
			aProblem.paidOnly ? 'locked/paid' : 'unlocked/free'
		} problem.`)
		.setURL(problemUrl);

	msg.channel.send(embed);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}