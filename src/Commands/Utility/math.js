const { evaluate } = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'math',
	desc: 'Allow you to solve equation simply',
	cooldown: 8000,
	aliases: ['solve'],
	args: true,
	usage: '<equation>',
	category: 'utility',
	run: (client, message, args) => {
		const answer = evaluate(
			args.join(' ').replace(/×/g, '*').replace(/÷/g, '/'),
		);
		if (typeof answer == 'function') return;
		const embed = new MessageEmbed()
			.setTitle(`# - ${client.botname}Math`)
			.setColor(client.color)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(
				`Requested by ${message.author.username}`,
				message.author.avatarURL({ dynamic: true }),
			)
			.addField(
				`• Your equation » \`${args.join(' ')}\` .`,
				`- The answer » \`${answer.toFixed(3)}\` .`,
			)
			.setTimestamp();
		message.channel.send(embed);
	},
};
