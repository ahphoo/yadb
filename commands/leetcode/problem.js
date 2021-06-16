const { MessageEmbed } = require('discord.js');
const problemUrlBase = 'https://leetcode.com/problems/';

module.exports = {
	name: 'problem',
    args: true,
	description: 'Bot replies with random leetcode problem',
    usage: '[ easy | medium | hard ]',
	execute(msg, args, client, allProblems, freeProblems, paidProblems) {
        if (['easy', 'medium', 'hard'].indexOf(args[0]) >= 0) {
			diff = args[0];
		}

        //console.log(allProblems);

        problemType(allProblems, msg, diff);

        // if (cmd === 'info') {
        //     msg.channel.send(
        //         `Leetcode currently has a total of ${totalProblems} problems of which ${freeProblems.length} are free, and ${paidProblems.length} are paid.`,
        //     );
        // }
        // else if (cmd === 'free') {
        //     problemType(freeProblems, msg, diff);
        // }
        // else if (cmd === 'paid') {
        //     problemType(paidProblems, msg, diff);
        // }
        // else if (cmd === 'help') {
        //     msg.channel.send(
        //         '```Usage:\n\n\t!problem (without args) - gives you a random problem of any difficulty either paid/free.' +
        //         '\n\n\t!problem free - gives you a random freely accessible problem of any difficulty.' +
        //         '\n\n\t!problem paid - gives you a random paid/locked problem of any difficulty.' +
        //         '\n\nAdding difficulty modifiers:\n\n\t!problem <free | paid> <easy | medium | hard> - lets you pick a random free or paid problem of the chosen difficulty.```',
        //     );
        // }
        // else {
        //     problemType(allProblems, msg, diff);
        // }
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

	const embed = new MessageEmbed()
		.setTitle(aProblem.title)
		.setColor('#f89f1b')
		// online image from leetcode website for thumbnail (pls don't go down)
		.setThumbnail('https://leetcode.com/static/images/LeetCode_logo_rvs.png')
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