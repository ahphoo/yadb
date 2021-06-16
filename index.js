// const dotenv = require('dotenv');
// dotenv.config();

const fs = require('fs');
const {prefix, token} = require('./config.json');
//const prefix = '!';
const axios = require('axios');
const ltApiUrl = 'https://leetcode.com/api/problems/all/';
let allProblems = [];
let freeProblems = [];
let paidProblems = [];
let totalProblems;

const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

class Problem {
	constructor(problemObj) {
		this.id = problemObj.stat.question_id;
		this.title = problemObj.stat.question__title;
		this.titleSlug = problemObj.stat.question__title_slug;
		this.difficulty = problemObj.difficulty.level === 3 ? 'Hard' : (problemObj.difficulty.level === 2 ? 'Medium' : 'Easy');
		this.paidOnly = problemObj.paid_only;
		this.description = `Problem ID: ${this.id}\nTitle: ${this.title}\nSlug Title: ${this.titleSlug}\nDifficulty: ${this.difficulty}\nIs Paid? ${this.paidOnly}`;
	}
}

async function getProblems(allProblems, freeProblems, paidProblems, totalProblems) {
	try {
		let resp = await axios.get(ltApiUrl);
		totalProblems = resp.data.num_total;
		//console.log(resp.data);
		resp.data.stat_status_pairs.forEach(problem => {
			const newProblem = new Problem(problem);

			// ToDo need to fix .filter but this works in the mean time
			if (newProblem.paidOnly === false) {
				freeProblems.push(newProblem);
			}
			else {
				paidProblems.push(newProblem);
			}

			allProblems.push(newProblem);
		});

		return 1;
	} catch(err) {
		console.log(err);
		msg.reply('Error while fetching problems from Leetcode :(');
	}
}

(async function(){
	await getProblems(allProblems, freeProblems, paidProblems, totalProblems);

	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client, allProblems, freeProblems, paidProblems));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client, allProblems, freeProblems, paidProblems));
		}
	}

	const commandFolders = fs.readdirSync('./commands');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
		
		for (const file of commandFiles) {
			const command = require(`./commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	}
})();

//client.login(process.env.TOKEN);  //Login using TOKEN stored in environment variable
client.login(token);

	// axios
	// .get(ltApiUrl)
	// .then(resp => {
	// 	totalProblems = resp.data.num_total;
	// 	resp.data.stat_status_pairs.forEach((problem) => {
	// 		const newProblem = new Problem(problem);
	// 		// ToDo need to fix .filter but this works in the mean time
	// 		if (newProblem.paidOnly === false) {
	// 			freeProblems.push(newProblem);
	// 		}
	// 		else {
	// 			paidProblems.push(newProblem);
	// 		}
	// 		allProblems.push(newProblem);
	// 	});
	// 	console.log(allProblems);
	// })
	// .catch((err) => {
	// 	console.log(err);
	// 	msg.reply('Error while fetching problems from Leetcode :(');
	// });