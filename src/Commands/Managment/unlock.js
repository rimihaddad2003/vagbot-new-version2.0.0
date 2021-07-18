module.exports = {
	name: 'unlock',
	desc: 'Allow you to allow a specific member or all members to type in a room',
	category: 'management',
	perms: ['administrator'],
	usage: '[user]',
	cooldown: 3000,
	run: (client, message, args) => {
		const user =
			message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) {
			return message.channel
				.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true })
				.then(() =>
					message.channel.send('**✅ - Successfully unlocked this channel .**'),
				);
		}
		else {
			return message.channel
				.updateOverwrite(user, { SEND_MESSAGES: true })
				.then(() =>
					message.channel.send(
						`**✅ - Successfully allowed ${user} to type in this channel .**`,
					),
				);
		}
	},
};
