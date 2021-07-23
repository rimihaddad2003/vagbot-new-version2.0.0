const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'message',
	desc: 'Send messages in the tickets',
	category: 'hidden',
	aliases: ['m'],
	usage: '<message>',
	args: true,
	cooldown: 5000,
	run: async (client, message, args) => {
		const channels = await settingSchema.findOne({ option: 'ticket' });
		if (!channels.setting.includes(message.channel.parentID)) return;
		const roles = await settingSchema.findOne({ option: 'staff' });
		if (!message.member.roles.cache.some(role => roles.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');
		const send = (photo) => {
			const embed = new MessageEmbed()
				.setTitle(`# - ${client.botname}Staff`)
				.attachFiles([`${__dirname}/../../Photos/Ticket${photo}.png`])
				.setImage(`attachment://Ticket${photo}.png`)
				.setFooter(`Staff » ${message.author.username}`,
					message.author.avatarURL({
						dynamic: true,
					}))
				.setColor(client.color)
				.setTimestamp();
			message.channel.send(embed);
			message.delete();
		};
		if (args[0].toLowerCase() == 'open') return send('Open');
		if (args[0].toLowerCase() == 'close') return send('Close');
		if (args[0].toLowerCase() == 'ask') return send('Ask');
		if (args[0].toLowerCase() == 'dwrong') return send('Wrong');
		if (args[0].toLowerCase() == 'mwrong') return send('MWrong');
		if (args[0].toLowerCase() == 'warn') return send('Warn');
	},
};
