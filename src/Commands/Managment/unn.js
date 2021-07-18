module.exports = {
	name: 'unnickname',
	desc: 'Remove nicknames from all members',
	aliases: ['unn'],
	category: 'Managment',
	perms: ['ADMINISTRATOR'],
	cooldown: 1,
	run: async (client, message) => {
		let count = 0;
		await message.guild.members.fetch().then(f => f.forEach(m => {
			if (m.nickname && !m.user.bot) {
				m.setNickname('');
				count++;
			}
		}),
		);
		message.channel.send(`**UnNicknamed {${count}} Members .**`);
	},
};
