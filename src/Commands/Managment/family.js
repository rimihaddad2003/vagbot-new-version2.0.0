const { MessageEmbed } = require('discord.js');
const familySchema = require('../../Models/settingModel');

module.exports = {
	name: 'family',
	desc: 'Check who has the (VAG) tag in their name',
	category: 'management',
	perms: ['MANAGE_NICKNAMES'],
	cooldown: 5000,
	run: async (client, message) => {
		const role = await familySchema.findOne({ option: 'family' });
		const norole = (m) =>
			!m.user.bot && m.user.username.toLowerCase().includes('vag') && !m.roles.cache.has(role.setting);
		const withrole = (m) =>
			!m.user.bot && !m.user.username.toLowerCase().includes('vag') && m.roles.cache.has(role.setting);
		const nickname = (m) => !m.user.bot && m.nickname;
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`# - ${client.botname}Family`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(
				`Request by ${message.author.username}`,
				message.author.avatarURL({ dynamic: true }),
			)
			.setTimestamp()
			.addField(
				`• Members have (VAG) in their name but don't have the role » [${(await message.guild.members.fetch()).filter(norole).size
				}]`,
				(await message.guild.members.fetch())
					.filter(norole)
					.map((m) => m.user)
					.join(', ') || '-',
			)
			.addField(
				`• Members don't have (VAG) in their name but have the role » [${(await message.guild.members.fetch()).filter(withrole).size
				}]`,
				(await message.guild.members.fetch())
					.filter(withrole)
					.map((m) => m.user)
					.join(', ') || '-',
			)
			.addField(
				`• Members have nickname » [${(await message.guild.members.fetch()).filter(nickname).size
				}]`,
				(await message.guild.members.fetch())
					.filter(nickname)
					.map((m) => m.user)
					.join(', ') || '-',
			);
		message.channel.send(embed);
	},
};
