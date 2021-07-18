module.exports = {
	name: 'show',
	desc: 'Allow you to show the channel to everyone or to a specific member',
	category: 'management',
	perms: ['administrator'],
	usage: '[user]',
	cooldown: 3000,
	run: (client, message, args) => {
		const user =
			message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) {
			return message.channel
				.updateOverwrite(message.guild.roles.everyone, {
					VIEW_CHANNEL: args.join(' ').includes('force') ? true : null,
				})
				.then(() =>
					message.channel.send('**✅ - Successfully showed this channel .**'),
				);
		}
		else {
			return message.channel
				.updateOverwrite(user, { VIEW_CHANNEL: true })
				.then(() =>
					message.channel.send(
						`**✅ - Successfully allowed ${user} to view this channel .**`,
					),
				);
		}
	},
};
