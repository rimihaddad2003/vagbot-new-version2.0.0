const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'vote',
	desc: 'Ask the members to vote for something',
	category: 'staff',
	perms: ['MANAGE_GUILD', 'MANAGE_MESSAGES'],
	usage: '<message>',
	args: true,
	cooldown: 5000,
	run: (client, message, args) => {
		const vote = args.join(' ');
		const embed = new MessageEmbed()
			.setTitle(`# - ${client.botname}Vote`)
			.setDescription(`• ${vote}`)
			.setFooter(
				`Requested by ${message.author.username}`,
				message.author.avatarURL({ dynamic: true }),
			)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor(client.color);
		message.channel.send(embed).then(async (msg) => {
			message.delete();
			await msg.react('796800628927234078');
			await msg.react('796800690428182558');
		});
	},
};
