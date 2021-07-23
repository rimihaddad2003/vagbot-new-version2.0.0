const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'reply',
	desc: 'Reply to a suggestion sent in the channel',
	category: 'management',
	usage: '<message id> <reply>',
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		const roles = await settingSchema.findOne({ option:'suggrole' });
		const channel = await settingSchema.findOne({ option:'suggestions' });
		if (!message.member.roles.cache.some(role => roles.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');
		const [id, ...reply] = args;
		if (!reply.length) {return message.channel.send('**🤔 - Please provide a reply to post .**');}
		client.channels.cache
			.get(channel.setting)
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
