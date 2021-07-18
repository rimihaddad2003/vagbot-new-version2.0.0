const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.author.bot) return;
		if (message.channel.id !== (await client.db.get('sugg_channel'))) return;
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`# - ${client.botname}Suggestion`)
			.setDescription(
				`**• ${message.author.username} Suggested »**\n- ${message.content}`,
			)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		message.channel
			.send(embed)
			.then(async (msg) => {
				message.delete();
				await msg.react('796800628927234078');
				await msg.react('796800690428182558');
			})
			.catch(() =>
				message.channel.send(
					'**:no_entry: - An error occurred while sending the suggestion, please try again later .**',
				),
			);
	},
};
