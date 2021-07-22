const settingSchema = require('../../Models/settingModel');
const activities = ['playing', 'watching', 'listening', 'streaming', 'competing'];

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
		const [stype, ...sname] = args;

		const settingData = await settingSchema.findOne({ option: 'status' })
			? await settingSchema.findOne({ option: 'status' })
			: new settingSchema({
				option: 'status',
				setting: {
					name: 'With {dsm} Members!',
					type: 'PLAYING',
					guild: '592265927819788289',
				},
			});
		settingData.save();

		if (!activities.includes(stype.toLowerCase())) return message.channel.send(`**⚠️ - Invalid status type, try one of those: \`${activities.map((v) => client.bettercase(v)).join('`, `')}\` .**`);
		if (!sname.length) return message.channel.send('**⚠️ - Please provide a status to apply it .**');

		const prestatus = {
			name: sname.join(' '),
			type: stype.toUpperCase(),
			guild: message.guild.id,
		};
		settingData.setting = prestatus;
		settingData.save();

		message.channel.send(`**✅ - Successfully changed bot's status into:**\n**<** ${client.bettercase(stype)} **${sname.join(' ').replace('{mcp}', '`MC-Players`').replace('{dsm}', '`Discord-Total-Members`').replace('{dso}', '`Discord-Online-Members`')} >**`);
	},
};
