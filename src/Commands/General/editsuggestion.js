const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const suggSchema = require('../../Models/suggestionModel');

module.exports = {
	name: 'editsuggestion',
	desc: 'allow you to edit a suggestion you send before',
	aliases: ['editsugg'],
	cooldown: 1000,
	usage: '<code> <message>',
	args: true,
	run: async (client, message, args) => {
		const channel = await settingSchema.findOne({ option: 'suggestions' });
		const [code, ...sugg] = args;
		const suggData = await suggSchema.findOne({ code: code });
		if (!suggData) return message.channel.send('**:no_entry: - This Code isn\'t valid .**');
		if (suggData.member != message.author.id) return message.channel.send('**:no_entry: - This suggestion isn\'t yours .**');
		if (!sugg.length) return message.channel.send('**🤔 - Please provide a message to post .**');
		client.channels.cache
			.get(channel.setting)
			.messages.fetch(suggData.message)
			.then(async (msg) => {
				const embed = new MessageEmbed(msg.embeds[0]);
				embed.setDescription(`• ${sugg.join(' ')}`);
				msg.edit(embed)
					.then(() => message.channel.send('**✅ - Successfully editted your reply .**'))
					.catch((err) => {
						message.channel.send('**🚫 - An Error occurred .');
						console.error(err);
					});
				client.channels.cache.get('883056917260406854').send(`**• <@${message.author.id}> editted his suggestion:**\n\n${msg.url}`);
			})
			.catch(() => message.channel.send('**⚠️ - Message was not found for some reason .'));
	},
};