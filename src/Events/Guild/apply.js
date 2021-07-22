const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		const channel1 = await settingSchema.findOne({ option: 'applyget' });
		const channel2 = await settingSchema.findOne({ option: 'applysend' });
		if (message.channel.id !== channel1.setting) return;
		if (message.author.bot) return;
		const channel = client.channels.cache.get(channel2.setting);
		const embed = new MessageEmbed()
			.setTitle(`# - ${client.botname}Apply`)
			.setDescription(message.content)
			.setFooter(`­ • Name: ${message.author.username}\n • ID: ${message.author.id}\n­`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(client.color)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL({ dynamic: true }));
		channel.send(embed);
		message.delete();
		message.channel.send('**📨 - Your Application has been sent to our staff .**')
			.then(msg => msg.delete({ timeout: 10000 }));
	},
};