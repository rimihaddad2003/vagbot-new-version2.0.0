const { MessageEmbed } = require('discord.js');
const reactions = ['😅', '🙂', '🤔', '🤭', '🤫', '😉'];
const answers = ['Yes', 'Of Course', 'Maybe', 'No', 'Impossible'];

module.exports = {
	name: '8ball',
	desc: 'Ask the bot a Yes/No question and wait for the answer',
	args: true,
	usage: '<question>',
	cooldown: 5000,
	aliases: ['truth'],
	category: 'fun',
	run: (client, message, args) => {
		const question = args.join(' ');
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setTitle(`# - ${client.botname}8ball`)
			.setFooter('This game is made for fun')
			.addField(`• ${message.author.username} asked me »`, `- ${question}`)
			.addField(
				'• My answer is »',
				`- ${answers[Math.floor(answers.length * Math.random())]}`,
			)
			.setTimestamp();
		message.channel.send(embed).then((msg) => {
			message.delete();
			msg.react(reactions[Math.floor(reactions.length * Math.random())]);
		});
	},
};
