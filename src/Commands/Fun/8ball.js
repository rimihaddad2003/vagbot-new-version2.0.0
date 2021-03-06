const { MessageEmbed } = require('discord.js');
const reactions = ['๐', '๐', '๐ค', '๐คญ', '๐คซ', '๐'];
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
			.addField(`โข ${message.author.username} asked me ยป`, `- ${question}`)
			.addField(
				'โข My answer is ยป',
				`- ${answers[Math.floor(answers.length * Math.random())]}`,
			)
			.setTimestamp();
		message.channel.send(embed).then((msg) => {
			message.delete();
			msg.react(reactions[Math.floor(reactions.length * Math.random())]);
		});
	},
};
