const countSchema = require('../../Models/countModel');

module.exports = {
	name: 'count',
	desc: 'add a number to the VagCount Event',
	category: 'fun',
	cooldown: 900000,
	run: async (client, message, args) => {
		if (message.member.roles.cache.has('871351934592909323')) return message.channel.send('**⛔ - You have been blacklisted from this event .**');
		const countData = await countSchema.findOne({ member: message.author.id })
			? await countSchema.findOne({ member: message.author.id })
			: new countSchema({
				member: message.author.id,
				number: 0,
			});
		countData.save();
		const globalCount = await countSchema.findOne({ member: 'global' });
		client.channels.cache.get('883724314426363994').send(!args.length ? `**• ${message.author} »** __${globalCount.number + 1}__ .` : `**• ${message.author} »** __${globalCount.number + 1}__ (${args.join(' ')}) .`).then(() => {
			message.delete();
			message.reply(`**You added one number to the counter, your score: (__${countData.number + 1}__)**`);
			countData.number++;
			countData.save();
			globalCount.number++;
			globalCount.save();
		});
	},
};
