const setting = require('../../Models/settingModel');
const afkModel = require('../../Models/afkModel');

module.exports = {
	name: 'afk',
	desc: 'Set your status to AFK',
	category: 'management',
	usage: '<message>',
	args: true,
	cooldown: 10000,
	run: async (client, message, args) => {
		const data = await setting.findOne({ option: 'staff' });
		if (!message.member.roles.cache.some(role => data.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');
		const afkData = await afkModel.findOne({ staff: message.author.id })
			? await afkModel.findOne({ staff: message.author.id })
			: new afkModel({
				staff: message.author.id,
				afk: false,
				message: 'none',
			});
		afkData.save();

		if (afkData.afk == true) return message.channel.send('**🤔 - You\'re already AFKing .**');

		afkData.staff = message.author.id;
		afkData.afk = true;
		afkData.message = args.join(' ');
		afkData.save();

		message.channel.send(`**✅ - Successfully set your AFK's status to:**\n\`${afkData.message}\``);
		message.member.setNickname(`• AFK | ${message.member.displayName}`);
	},
};