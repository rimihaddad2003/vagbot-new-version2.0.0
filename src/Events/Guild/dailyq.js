const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		const channelid = '870731334467846184';
		if (message.channel.id !== channelid) return;
		const role = await settingSchema.findOne({ option: 'event' });
		if (message.member.roles.cache.has(role.setting)) return;
		const channel = client.channels.cache.get(channelid);
		const embed = new MessageEmbed()
			.setTitle(`# - ${client.botname}DailyQ`)
			.setDescription(message.content)
			.setFooter(`­ • Name: ${message.author.username}\n • ID: ${message.author.id}\n­`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(client.color)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL({ dynamic: true }));
		channel.send(embed).then(() => message.delete());
	},
};