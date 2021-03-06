const leven = require('leven');
const maintSchema = require('../../Models/maintenanceModel');

module.exports = {
	name: 'maintenance',
	desc: 'Turn commands on and off for maintenance',
	category: 'hidden',
	aliases: ['maint'],
	usage: '<command>',
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		if (message.author.id !== client.owner) return;
		const command =
			client.commands.get(args[0].toLowerCase()) ||
			client.commands.get(client.aliases.get(args[0].toLowerCase()));
		if (!command) {
			const best = [
				...client.commands.map((m) => m.name),
				...client.aliases.keys(),
			].filter(
				(c) => leven(args[0].toLowerCase(), c.toLowerCase()) < c.length * 0.4,
			);
			const corr =
				best.length == 0
					? ''
					: best.length == 1
						? `Did you mean this : \`${best[0]}\``
						: `Did you mean any of these : \`${best
							.map((v) => v)
							.join('`, `')}\``;
			if (!corr) { return message.channel.send('**🤔 - Invalid command .**'); }
			else {
				return message.channel.send(
					`**🤔 - Invalid command .**\n**${corr} .**`,
				);
			}
		}
		const maintData = await maintSchema.findOne({ commandname: command.name })
			? await maintSchema.findOne({ commandname: command.name })
			: new maintSchema({
				commandname: command.name,
				maintenance: false,
			});
		maintData.save();

		if (args[1] == 'status' && maintData.maintenance == true) return message.channel.send('**🔴 - This command currently under maintenance .**');
		if (args[1] == 'status' && maintData.maintenance == false) return message.channel.send('**🟢 - This command is working .**');
		if (maintData.maintenance == false) {
			maintData.maintenance = true;
			maintData.save();
			message.channel.send(
				'**✅ - Successfully turned on command maintenance .**',
			);
		}
		else {
			maintData.maintenance = false;
			maintData.save();
			message.channel.send('**✅ - Successfully turned off command maintenance .**');
		}
	},
};