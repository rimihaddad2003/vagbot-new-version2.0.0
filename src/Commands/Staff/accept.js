const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: 'accept',
	desc: 'Accept someone\'s application',
	category: 'staff',
	usage: '<member>',
	args: true,
	cooldown: 5000,
	perms: ['MANAGE_ROLES'],
	run: (client, message, args) => {
		if (message.guild.id !== '592265927819788289') return message.channel.send('**• This command works in Vagmemes Discord Server only .**');
		const mem = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!mem) return message.channel.send('**🤔 - Please provide a valid user .**');
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
		message.channel.send(`**• Are you sure you want to accept __${mem.user.username}__ ?**`, row).then(msg => {
			const filter = button => button.clicker.user.id == message.author.id;
			msg.awaitButtons(filter, { max: 1, time: 60000, errors: ['time'] }).then(async collected => {
				if (collected.first().id == 'button1') {
					collected.first().reply.send(`**• The role has been given to __${mem.user.username}__ .**`);
					mem.roles.add(message.guild.roles.cache.get('830956463052685332'));
					mem.user.send(`**• Hey ${mem.user} .**\n- You have been accepted to be a part of our Discord staff team .\n- Please join Our Staff Server .\n\n**• مرحباً ${mem.user} .**\n- لقد تم قبولك لتكون جزءاً من فريق الإدارة الخاصة بنا .\n- الرجاء دخول سيرفر الإدارة الخاصة بنا .\n\n|| https://discord.gg/v4dgF3g8Mb ||`).catch(() => message.channel.send(`**• ${mem.user.username} has his private message turn off .**`));
				}
				else if (collected.first().id == 'button2') {
					collected.first().reply.send('**Canceled .**');
				}
			}).catch(() => message.channel.send(`**⌛ - You didn't accept __${mem.user.username}__ .**`));
		});
	},
};
