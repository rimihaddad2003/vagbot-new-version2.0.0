const ticketSchema = require('../../Models/ticketModel');

module.exports = {
	name: 'points',
	desc: 'Change staff\'s points',
	category: 'staff',
	usage: '<ticket> <user> [points]',
	perms: ['ADMINISTRATOR'],
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || client.users.cache.get(args[1]);
		if (!user) return message.channel.send('**🤔 - Please provide a valid user mention or ID .**');

		const ticketData = await ticketSchema.findOne({ staff: user.id })
			? await ticketSchema.findOne({ staff: user.id })
			: new ticketSchema({
				staff: user.id,
				points: 0,
			});
		ticketData.save();

		if (!args[2]) return message.channel.send(`**🔎 - ${user} has \`${ticketData.points}\` tickets points .**`);
		if (isNaN(args[2])) return message.channel.send('**❌ - Points must be a number .**');
		ticketData.points = args[2];
		ticketData.save();
		message.channel.send(`**✅ - Successfully set ${user}'s tickets points to \`${args[2]}\` .**`);
	},
};