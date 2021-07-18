module.exports = {
	name: 'messageReactionAdd',
	run: async (client, reaction, user) => {
		if (user.bot) return;
		const option = await client.db.get('event_noti');
		if (option && reaction.message.id == option.msg) {
			reaction.message.guild.members.cache
				.get(user.id)
				.roles.add(reaction.message.guild.roles.cache.get(option.role));
		}
	},
};
