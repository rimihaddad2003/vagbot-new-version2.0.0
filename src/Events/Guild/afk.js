module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.guild.id !== '592265927819788289') return;
		const staff = message.mentions.users.first();
		if (staff) {
			const outafk = await client.db.get(`${staff.id}_afk`);
			if (outafk && outafk.status == true) {
				return message.channel.send(
					`**💤 - \`${staff.username}\` is currently AFK for:**\n${outafk.message}`,
				);
			}
		}
		const afk = await client.db.get(`${message.author.id}_afk`);
		if (afk && afk.status == true) {
			await client.db
				.set(`${message.author.id}_afk`, {
					status: false,
				});
			message.channel
				.send('**👋 - Welcome back, I removed your AFK status .**')
				.then((msg) => msg.delete({
					timeout: 3000,
				}));
			message.member.setNickname('');
		}
	},
};
