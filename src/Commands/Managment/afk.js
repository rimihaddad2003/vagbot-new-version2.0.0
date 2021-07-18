module.exports = {
	name: 'afk',
	desc: 'Set your status to AFK',
	category: 'management',
	usage: '<message>',
	args: true,
	cooldown: 10000,
	run: async (client, message, args) => {
		const afk = await client.db.get(`${message.author.id}_afk`);
		const roles = await client.db.get('staff_role');
		if (!message.member.roles.cache.some(role => roles.includes(role.id))) {return message.channel.send('**🚫 - This command is for staff only .**');}
		if (afk && afk.status == true) {return message.channel.send('**🤔 - You\'re already AFKing .**');}
		const obj = {
			status: true,
			message: args.join(' '),
		};
		await client.db.set(`${message.author.id}_afk`, obj);
		message.channel.send(
			`**✅ - Successfully set your AFK's status to:**\n\`${obj.message}\``,
		);
		message.member.setNickname(`[AFK] ${message.author.username}`);
	},
};
