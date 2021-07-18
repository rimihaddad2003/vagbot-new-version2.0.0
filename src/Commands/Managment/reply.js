/* eslint-disable no-undef */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'reply',
	desc: 'Reply to a suggestion sent in the channel',
	category: 'management',
	perms: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	usage: '<message id> <reply>',
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		[id, ...reply] = args;
		if (!reply.length) {return message.channel.send('**🤔 - Please provide a reply to post .**');}
		client.channels.cache
			.get(await client.db.get('sugg_channel'))
			.messages.fetch(id)
			.then((msg) => {
				const embed = new MessageEmbed(msg.embeds[0]);
				if (!embed.fields.length) {embed.addField('• Staff Reply »', `- ${reply.join(' ')}`);}
				else {embed.fields[0].value = `- ${reply.join(' ')}`;}
				msg
					.edit(embed)
					.then(() =>
						message.channel.send('**✅ - Successfully posted the reply .**'),
					)
					.catch((err) => {
						message.channel.send('**🚫 - An Error occurred .');
						console.error(err);
					});
			})
			.catch((err) => {
				if (err.message == 'Unknown Message') {
					message.channel.send(
						'**⚠️ - Message was not found, make sure that\'s a valid ID .**',
					);
				}
				else {console.error(err);}
			});
	},
};
