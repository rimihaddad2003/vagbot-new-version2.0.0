const { MessageEmbed } = require('discord.js');
const logs = [
	'826916592297443329',
	'826916963368173629',
	'826917005243187250',
	'826917057139572766',
	'826917101251985408',
	'826917144071635044',
	'826917197984301106',
	'826917240905400330',
];

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.channel.id !== await client.db.get('logs_channel')) return;
		if (!message.embeds[0]) return;
		const embed = new MessageEmbed(message.embeds[0])
			.setThumbnail(message.guild.iconURL());
		client.channels.cache.get(logs[embed.color - 1]).send(embed).catch(err => console.error(err));
	},
};