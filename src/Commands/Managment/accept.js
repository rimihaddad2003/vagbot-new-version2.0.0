module.exports = {
	name: 'accept',
	desc: 'Accept someone\'s application',
	category: 'management',
	usage: '<member>',
	args: true,
	cooldown: 5000,
	perms: ['MANAGE_ROLES'],
	run: (client, message, args) => {
		if (message.guild.id !== '592265927819788289') return message.channel.send('**• This command works in Vagmemes Discord Server only .');
		const mem = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!mem) return message.channel.send('**🤔 - Please provide a valid user .**');
		message.channel.send(`**• Are you sure you want to accept __${mem.user.username}__ ?**`).then(msg => {
			msg.react('✅');
			const filter = (reaction, user) => {
				return reaction.emoji.name === '✅' && user.id === message.author.id;
			};
			msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(() => {
				msg.delete();
				message.channel.send(`**• The role has been given to __${mem.user.username}__ .**`);
				mem.roles.add(message.guild.roles.cache.get('830956463052685332'));
				mem.user.send(`**• Hey ${mem.user} .**\n- You have been accepted to be a part of our Discord staff team .\n- Please join Our Staff Server .\n\n**• مرحباً ${mem.user} .**\n- لقد تم قبولك لتكون جزءاً من فريق الإدارة الخاصة بنا .\n- الرجاء دخول سيرفر الإدارة الخاصة بنا .\n\n|| https://discord.gg/v4dgF3g8Mb ||`).catch(() => message.channel.send(`**• ${mem.user.username} has his private message turn off .**`));
			}).catch(() => message.channel.send(`**• You didn't accept __${mem.user.username}__ .**`));
		});
	},
};
