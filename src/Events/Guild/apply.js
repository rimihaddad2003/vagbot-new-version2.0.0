const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.channel.id !== await client.db.get('apply_channel')) return;
		if (message.author.bot) return;
		const channel = client.channels.cache.get(await client.db.get('applysend_channel'));
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