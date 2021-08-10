const pointsSchema = require('../../Models/pointsModel');

module.exports = {
	name: 'points',
	desc: 'Change staff\'s points',
	category: 'staff',
	aliases: ['p'],
	usage: '<ticket/proof> <user> [points]',
	perms: ['ADMINISTRATOR'],
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		if (args[0] == 'tickets' || args[0] == 'ticket' || args[0] == 't') {
			const user = message.mentions.users.first() || client.users.cache.get(args[1]);
			if (!user) return message.channel.send('**🤔 - Please provide a valid user mention or ID .**');

			const pointsData = await pointsSchema.findOne({ staff: user.id })
				? await pointsSchema.findOne({ staff: user.id })
				: new pointsSchema({
					staff: user.id,
					tickets: 0,
					proofs: 0,
				});
			pointsData.save();

			if (!args[2]) return message.channel.send(`**🔎 - ${user} has \`${pointsData.tickets}\` tickets points .**`);
			if (isNaN(args[2])) return message.channel.send('**❌ - Points must be a number .**');
			pointsData.tickets = args[2];
			pointsData.save();
			message.channel.send(`**✅ - Successfully set ${user}'s tickets points to \`${args[2]}\` .**`);
		}
		else if (args[0] == 'proofs' || args[0] == 'proof' || args[0] == 'p') {
			const user = message.mentions.users.first() || client.users.cache.get(args[1]);
			if (!user) return message.channel.send('**🤔 - Please provide a valid user mention or ID .**');

			const pointsData = await pointsSchema.findOne({ staff: user.id })
				? await pointsSchema.findOne({ staff: user.id })
				: new pointsSchema({
					staff: user.id,
					tickets: 0,
					proofs: 0,
				});
			pointsData.save();

			if (!args[2]) return message.channel.send(`**🔎 - ${user} has \`${pointsData.proofs}\` proofs points .**`);
			if (isNaN(args[2])) return message.channel.send('**❌ - Points must be a number .**');
			pointsData.proofs = args[2];
			pointsData.save();
			message.channel.send(`**✅ - Successfully set ${user}'s proofs points to \`${args[2]}\` .**`);
		}
	},
};