module.exports = {
	name: 'unnickname',
	desc: 'Remove nicknames from all members',
	aliases: ['unn'],
	category: 'Management',
	perms: ['ADMINISTRATOR'],
	cooldown: 1,
	run: async (client, message) => {
		let count = 0;
		message.channel.send(`**• Are you sure you want to remove all members nicknames ?**`).then(msg => {
			msg.react('✅');
			const filter = (reaction, user) => {
				return reaction.emoji.name === '✅' && user.id === message.author.id;
			};
			msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(async () => {
				await message.guild.members.fetch().then(f => f.forEach(m => {
					if (m.nickname && !m.user.bot) {
						m.setNickname('');
						count++;
					}
				})
				);
				msg.delete();
				message.channel.send(`**UnNicknamed {${count}} Members .**`);
			})
		})

	},
};
