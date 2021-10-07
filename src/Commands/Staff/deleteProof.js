const proofsSchema = require('../../Models/proofsModel');
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'deleteproof',
	desc: 'Delete the proof channel',
	category: 'staff',
	aliases: ['dp'],
	cooldown: 10000,
	run: async (client, message) => {
		const roles = await settingSchema.findOne({ option: 'staff' });
		if (!message.member.roles.cache.some(role => roles.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');
		const proof = await proofsSchema.findOne({ channel: message.channel.id });
		if (!proof) return message.channel.send('**🤔 - Make sure you run the command in a proof channel.**');
		message.channel.send('**⌛ - Deleting channel in 5 seconds.**');
		const channel = client.channels.cache.get('895359494102589441');
		const msg = await channel.messages.fetch(proof.msgID);
		const oldEmbed = msg.embeds[0];
		msg.edit('**• Done.**', { embed: oldEmbed });
		setTimeout(() => {
			message.channel.delete();
			proof.delete();
		}, 5000);
	},
};