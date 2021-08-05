const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const { MessageButton } = require('discord-buttons');

module.exports = {
	name: 'first',
	desc: 'Send a message to let members win prizes',
	category: 'utility',
	cooldown: 1000,
	args: true,
	usage: '<prize>',
	run: async (client, message, args) => {
		const role = await settingSchema.findOne({ option: 'event' });
		if (!message.member.roles.cache.has(role.setting)) return message.channel.send('**⚠️ - You don\'t have the required role .**');
		const button = new MessageButton()
			.setStyle('gray')
			.setID('firstevent')
			.setLabel('Click to Win')
			.setEmoji('🎉');
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`# - ${client.botname}First`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(`Hosted By » ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
			.setTimestamp()
			.setDescription(`**• Prize :** ${args.join(' ')} .\n**• Winner :** No one yet .`);
		message.channel.send(embed, button);
		message.delete();
	},
};