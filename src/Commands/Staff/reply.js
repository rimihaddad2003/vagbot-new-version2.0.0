const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const suggSchema = require('../../Models/suggestionModel');

module.exports = {
	name: 'reply',
	desc: 'Reply to a suggestion sent in the channel',
	category: 'staff',
	usage: '<message id> <reply>',
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		const roles = await settingSchema.findOne({ option: 'suggrole' });
		const channel = await settingSchema.findOne({ option: 'suggestions' });
		if (!message.member.roles.cache.some(role => roles.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');
		const [code, ...reply] = args;
		const suggData = await suggSchema.findOne({ code: code });
		if (!suggData) return message.channel.send('**:no_entry: - This Code isn\'t valid .**');
		if (!reply.length) return message.channel.send('**🤔 - Please provide a reply to post .**');
		client.channels.cache
			.get(channel.setting)
			.messages.fetch(suggData.message)
			.then(async (msg) => {
				const embed = new MessageEmbed(msg.embeds[0]);
				if (!embed.fields.length) embed.addField('• Staff Reply »', `- ${reply.join(' ')}`);
				else embed.fields[0].value = `- ${reply.join(' ')}`;
				msg.edit(embed)
					.then(() => message.channel.send('**✅ - Successfully posted the reply .**'))
					.catch((err) => {
						message.channel.send('**🚫 - An Error occurred .');
						console.error(err);
					});
				(await client.users.fetch(suggData.member)).send(`**• a Staff replied to your suggestion .**\n**• قام أحد الإداريين بالرد على إقتراحك .**\n\n${msg.url}`);
			})
			.catch(() => message.channel.send('**⚠️ - Message was not found for some reason .'));
	},
};
