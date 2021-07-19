module.exports = {
	name: 'setstatus',
	desc: 'Change the bot\'s status with a multiple variable',
	category: 'config',
	aliases: ['ss'],
	perms: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	usage: '<type> <status>',
	args: true,
	cooldown: 10000,
	run: async (client, message, args) => {
		const activities = [
			'playing',
			'watching',
			'listening',
			'streaming',
			'competing',
		];
		const [stype, ...sname] = args;
		if (!activities.includes(stype.toLowerCase())) {
			return message.channel.send(
				`**⚠️ - Invalid status type, try one of those: \`${activities
					.map((v) => client.bettercase(v))
					.join('`, `')}\` .**`,
			);
		}
		if (!sname.length) {
			return message.channel.send(
				'**⚠️ - Please provide a status to apply it .**',
			);
		}
		const prestatus = {
			name: sname.join(' '),
			type: stype.toUpperCase(),
			guild: message.guild.id,
		};
		await client.db
			.set('prestatus', prestatus);
		message.channel.send(
			`**✅ - Successfully changed bot's status into:**\n**<** ${client.bettercase(
				stype,
			)} **${sname
				.join(' ')
				.replace('{mcp}', '`MC-Players`')
				.replace('{dsm}', '`Discord-Total-Members`')
				.replace('{dso}', '`Discord-Online-Members`')} >**`,
		);
	},
};
