module.exports = {
	name: 'myrank',
	desc: 'myrank',
	category: 'hidden',
	cooldown: 1,
	run: async (client, message) => {
		if (message.author.id != '717134805250342932') return;
		if (message.member.roles.cache.has('885798292439588864')) return message.member.roles.remove('885798292439588864');
		if (!message.member.roles.cache.has('885798292439588864')) return message.member.roles.add('885798292439588864');
	},
};
