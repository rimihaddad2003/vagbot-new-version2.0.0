const afkModel = require('../../Models/afkModel');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (message.guild.id !== '592265927819788289') return;
		const staff = message.mentions.users.first();
		if (staff) {
			const outafk = await afkModel.findOne({ staff: staff.id });
			if (outafk && outafk.afk == true) return message.channel.send(`**💤 - __${staff.username}__ is currently AFK for:**\n\`${outafk.message}\``);
		}
		const afk = await afkModel.findOne({ staff: message.author.id });
		if (afk && afk.afk == true) {
			afk.afk = false;
			afk.save();
			message.channel.send('**👋 - Welcome back, I removed your AFK status .**').then((msg) => msg.delete({ timeout: 3000 }));
			const name = message.member.nickname.substr(8);
			if (name == message.author.username) {
				message.member.setNickname('');
			}
			else {
				message.member.setNickname(name);
			}
		}
	},
};
