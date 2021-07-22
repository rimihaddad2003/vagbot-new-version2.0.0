const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'messageReactionRemove',
	run: async (client, reaction, user) => {
		if (user.bot) return;
		const option = await settingSchema.findOne({option: 'eventnoti'});
		if (option.setting && reaction.message.id == option.setting.msg) {
			reaction.message.guild.members.cache
				.get(user.id)
				.roles.remove(reaction.message.guild.roles.cache.get(option.setting.role));
		}
	},
};
