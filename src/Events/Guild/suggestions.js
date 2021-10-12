const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const suggSchema = require('../../Models/suggestionModel');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.author.bot) return;
		const channel = await settingSchema.findOne({ option: 'suggestions' });
		if (message.channel.id !== channel.setting && message.channel.id !== '868549115062145085') return;
		const code = Math.random().toString(36).substr(2, 5);
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`# - ${client.botname}Suggestion`)
			.setDescription(`• ${message.content}`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(`­ • Code » ${code} \n • Member » ${message.author.tag}\n­`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		message.channel.send(embed).then(async (msg) => {
			const suggData = new suggSchema({
				code: code,
				member: message.author.id,
				message: msg.id,
			});
			suggData.save();
			message.delete();
			await msg.react('796800628927234078');
			await msg.react('796800690428182558');
		}).catch(() => message.channel.send('**:no_entry: - An error occurred while sending the suggestion, please try again later .**'));
	},
};
