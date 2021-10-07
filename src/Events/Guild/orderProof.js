const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const proofsSchema = require('../../Models/proofsModel');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		const channel1 = await settingSchema.findOne({ option: 'proofget' });
		const channel2 = await settingSchema.findOne({ option: 'proofsend' });
		if (message.channel.id !== channel1.setting) return;
		if (message.author.bot) return;
		const channel = client.channels.cache.get(channel2.setting);
		const code = Math.random().toString(36).substr(2, 5);
		const proofsData = new proofsSchema({
			code: code,
			member: message.author.id,
			message: message.content,
		});
		proofsData.save();
		const embed = new MessageEmbed()
			.setTitle(`# - ${client.botname}Proof`)
			.setDescription(message.content)
			.setFooter(`­ • Code: ${code}\n • Name: ${message.author.username}\n • ID: ${message.author.id}\n­`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(client.color)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL({ dynamic: true }));
		channel.send('@here', { embed: embed }).then(msg => {
			proofsData.msgID = msg.id;
			proofsData.save();
		});
		message.delete();
		message.channel.send(`**📨 - ${message.author}, Your order has been sent to our staff, we will contact you soon .**`)
			.then(msg => msg.delete({ timeout: 15000 }));
	},
};