const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'event',
	desc: 'start or end an event by reaction roles',
	category: 'utility',
	cooldown: 1000,
	run: async (client, message) => {
		const role = await settingSchema.findOne({ option: 'event' });
		if (!message.member.roles.cache.has(role.setting)) return message.channel.send('**⚠️ - You don\'t have the required role .**');
		const settingData = await settingSchema.findOne({ option: 'eventnoti' })
			? await settingSchema.findOne({ option: 'eventnoti' })
			: new settingSchema({
				option: 'eventnoti',
				setting: false,
			});
		settingData.save();
		if (settingData.setting == false) {
			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`# - ${client.botname}Event`)
				.setThumbnail(
					message.guild.iconURL({
						dynamic: true,
					}),
				)
				.setFooter(
					`Hosted By » ${message.author.username}`,
					message.author.avatarURL({
						dynamic: true,
					}),
				)
				.setTimestamp()
				.setDescription(
					'• If you want to receive this event\'s notifications, click on the 🎉 below .\n• إذا كنت تريد أن تصلك إشعارات هذه الفعالية، إضغط على 🎉 بالأسفل .',
				);
			message.channel.send(embed).then(async (msg) => {
				msg.react('🎉');
				message.guild.roles
					.create({
						data: {
							name: 'N.Event',
							color: 'BLUE',
						},
					})
					.then(async (role1) => {
						const option = {
							msg: msg.id,
							role: role1.id,
						};
						settingData.setting = option;
						settingData.save();
					});
				await msg.pin();
			});
			message.delete();
		}
		else {
			message.delete();
			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`# - ${client.botname}Event`)
				.setThumbnail(
					message.guild.iconURL({
						dynamic: true,
					}),
				)
				.setFooter(
					`Hosted By » ${message.author.username}`,
					message.author.avatarURL({
						dynamic: true,
					}),
				)
				.setTimestamp()
				.setDescription(
					'• This is the end of today\'s event, we hope you like it .\n• هذه نهاية فعالية اليوم، نتمنى أنكم استمتعتم .',
				);
			const option = settingData.setting;
			message.channel.send(embed).then(msg => msg.react('808781729468645496'));
			message.guild.roles.cache.get(option.role).delete();
			await message.channel.messages.fetch(option.msg).then(msg => msg.unpin());
			settingData.setting = false;
			settingData.save();
		}
	},
};
