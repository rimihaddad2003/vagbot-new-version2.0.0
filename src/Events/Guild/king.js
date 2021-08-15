module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.author.id !== '852847095270211584') return;
		try {
			const webhooks = await message.channel.fetchWebhooks();
			let webhook = webhooks.first();
			if (!webhook) {
				await message.channel.createWebhook('King');
				const webhooks1 = await message.channel.fetchWebhooks();
				webhook = webhooks1.first();
			}
			await webhook.send({
				content: message.content,
				username: message.author.username,
				avatarURL: message.author.displayAvatarURL(),
			}).then(() => message.delete());
		}
		catch (error) {
			console.log(error);
		}
	},
};