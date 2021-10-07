const { MessageEmbed } = require('discord.js');
const proofsSchema = require('../../Models/proofsModel');

module.exports = {
	name: 'proof',
	desc: 'Give the proof to the member',
	category: 'staff',
	usage: '<code>',
	args: true,
	cooldown: 20000,
	/**
	 * @param { Client } client
	 * @param { Message } message
	 * @param { String[] } args
	 */
	run: async (client, message, args) => {
		if (message.guild.id !== '768187504385196043') return message.channel.send('**• This command works in Vagmemes Staff Server only .**');
		const proof = await proofsSchema.findOne({ code: args[0] });
		if (!proof) return message.channel.send('**❌ - Invalid code.**');
		if (proof.channel) return message.channel.send('**❌ - Another staff already took this order.**');
		const vag = client.guilds.cache.get('592265927819788289');
		vag.channels.create(`proof-${(await client.users.fetch(proof.member)).username}`, {
			parent: '895363980883791942',
			permissionOverwrites: [
				{
					id: vag.roles.everyone.id,
					deny: ['VIEW_CHANNEL', 'MANAGE_MESSAGES'],
					allow: ['ATTACH_FILES', 'EMBED_LINKS'],
				},
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: proof.member,
					deny: ['SEND_MESSAGES'],
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: '853183131259109416',
					allow: ['VIEW_CHANNEL'],
					type: 'role',
				},
			],
		}).then(async channel => {
			proof.channel = channel.id;
			proof.save();
			message.channel.send(`**✅ - Channel created at <#${channel.id}> .**`);
			const embed = new MessageEmbed()
				.setTitle(`# - ${client.botname}Proof`)
				.setDescription(proof.message)
				.setFooter(`­ • Name: ${(await client.users.fetch(proof.member)).username}\n • Staff: ${message.author.username}\n­`, message.author.displayAvatarURL({ dynamic: true }))
				.setColor(client.color)
				.setTimestamp()
				.setThumbnail(vag.iconURL({ dynamic: true }));
			channel.send(`<@${proof.member}>`, { embed: embed });
			channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(() => {
				channel.updateOverwrite(proof.member, {
					SEND_MESSAGES: true,
				});
			});
		});
	},
};