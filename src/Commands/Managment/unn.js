const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: 'unnickname',
	desc: 'Remove nicknames from all members',
	aliases: ['unn'],
	category: 'Management',
	perms: ['ADMINISTRATOR'],
	cooldown: 1,
	run: async (client, message) => {
		let count = 0;
		const button1 = new MessageButton()
			.setStyle('green')
			.setLabel('Yes!')
			.setID('button1');
		const button2 = new MessageButton()
			.setStyle('gray')
			.setLabel('No')
			.setID('button2');
		const row = new MessageActionRow()
			.addComponents(button1, button2);
		message.channel.send('**🤔 - Are you sure you want to remove all members nicknames ?**', row).then(msg => {
			const filter = button => button.clicker.user.id == message.author.id;
			msg.awaitButtons(filter, { max: 1, time: 60000, errors: ['time'] }).then(async collected => {
				if (collected.first().id == 'button1') {
					collected.first().reply.send(`**✅ - UnNicknamed {${count}} Members .**`);
					await message.guild.members.fetch().filter(m => !m.user.bot && m.nickname).then(f => f.forEach(m => {
						m.setNickname('');
						count++;
					}),
					);
				}
				else if (collected.first().id == 'button2') {
					collected.first().reply.send('**Canceled .**');
				}
			});
		});

	},
};
