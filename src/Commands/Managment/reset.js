module.exports = {
	name: 'reset',
	desc: 'Reset a member\'s permission in the channel',
	category: 'management',
	perms: ['administrator'],
	usage: '<user>',
	args: true,
	cooldown: 3000,
	run: (client, message, args) => {
		const user =
			message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) {
			return message.channel.send(
				'**⚠️ - Please provide a valid user ID or a mention instead .**',
			);
		}
		const perms = message.channel.permissionOverwrites.get(user.id);
		if (!perms) return message.channel.send(`**🤔 - ${user} don't have any permissions in this channel to reset .**`);
		perms.delete()
			.then(() =>
				message.channel.send(
					`**✅ - Successfully reset ${user}'s permissions in this channel .**`,
				),
			);
	},
};
