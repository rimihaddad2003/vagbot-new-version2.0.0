/* eslint-disable max-nested-callbacks */
module.exports = {
	name: 'team',
	desc: 'Create a team for ITT event',
	category: 'hidden',
	cooldown: 3000,
	run: async (client, message) => {
		if (!message.member.roles.cache.has('834857118058151987')) return;
		const filter = m => m.author.id == message.author.id;
		let name = '';
		let error = false;
		const members = [];

		await message.channel.send('**🤝 - Enter The Team Name :**').then(() => {
			message.channel.awaitMessages(filter, {
				time: 60000,
				max: 1,
				errors: ['time'],
			})
				.then(messages => {
					name = messages.first().content;

					message.channel.send('**👤 - Please Provide 3 Member __(mention/ID)__ Including Team\'s Owner :** (Every Member In A Single Message)').then(() => {
						message.channel.awaitMessages(filter, {
							time: 60000,
							max: 3,
							errors: ['time'],
						})
							.then(msgs => {
								msgs.array().forEach((msg, index) => {
									const user = msg.mentions.members.first() || message.guild.members.cache.get(msg.content);
									if (!user) {
										message.channel.send(`**- Member Number \`${index + 1}\` is Invalid .**`);
										error = true;
										return;
									}
									else if (user.roles.cache.has('834857374635917362')) {
										message.channel.send(`**- Member Number \`${index + 1}\` is Already in a Team .**`);
										error = true;
										return;
									}
									else {members.push(user.id);}
								});
								if (error) return;
								client.channels.cache.get('836542564579934228').send(`**• Team »** ${name}\n**- Members »** ${members.map(m => `<@${m}>`).join(', ')}`).then(s => s.channel
									.send({
										files: [{
											attachment: `${__dirname}/../../Photos/VagLine.png`,
											name: 'VagLine.png',
										},
										],
									}));

								message.guild.roles
									.create({
										data: {
											name: `• ITT (${name}).`,
										},
									}).then(role => {
										members.forEach(m => {
											const mem = message.guild.members.cache.get(m);
											mem.roles.add(role);
											mem.roles.add(message.guild.roles.cache.get('834857374635917362'));
										});
									});
								message.channel.send('**✅ - The Team Has been Created .**');
							})
							.catch(() => {
								message.channel.send('**⌛ - You Didn\'t Enter The 3 Members .**');
							});
					});

				})
				.catch(() => {
					message.channel.send('**⌛ - You Didn\'t Enter The Team Name .**');
				});
		});
	},
};