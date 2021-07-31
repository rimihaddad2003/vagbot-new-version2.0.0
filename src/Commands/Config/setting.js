const settingSchema = require('../../Models/settingModel');
const settings = ['suggestions', 'welcome', 'applyget', 'applysend', 'family', 'event', 'ticket', 'staff', 'suggrole', 'ticketclosed'];

module.exports = {
	name: 'setting',
	desc: 'Change bot\'s setting in the server',
	category: 'config',
	perms: ['ADMINISTRATOR'],
	usage: '<setting> [new]',
	args: true,
	cooldown: 3000,
	run: async (client, message, args) => {
		const [setting, ...newset] = args;

		if (!settings.includes(setting.toLowerCase())) {
			return message.channel.send(
				`**⚠️ - Invalid option, try one of those: \`${settings.map((v) => client.bettercase(v)).join('`, `')}\` .**`);
		}

		settings.forEach(async set => {
			const settingData = await settingSchema.findOne({ option: set })
				? await settingSchema.findOne({ option: set })
				: new settingSchema({
					option: set,
					setting: null,
				});
			settingData.save();
		});

		const settingData = await settingSchema.findOne({ option: setting });


		if (setting.toLowerCase() == 'suggestions') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current suggestion channel is <#${settingData.setting}> .**`); }
			else {
				const channel = message.mentions.channels.first() || client.channels.cache.get(newset[0]);
				if (!channel) return message.channel.send('**⚠️ - Invalid channel, please provide a mention or an ID .**');
				settingData.setting = channel.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set suggestions channel to <#${channel.id}> .**`);
			}
		}

		if (setting.toLowerCase() == 'welcome') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current welcome channel is <#${settingData.setting}> .**`); }
			else {
				const channel = message.mentions.channels.first() || client.channels.cache.get(newset[0]);
				if (!channel) return message.channel.send('**⚠️ - Invalid channel, please provide a mention or an ID .**');
				settingData.setting = channel.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set welcome channel to <#${channel.id}> .**`);
			}
		}

		if (setting.toLowerCase() == 'applyget') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current apply getting channel is <#${settingData.setting}> .**`); }
			else {
				const channel = message.mentions.channels.first() || client.channels.cache.get(newset[0]);
				if (!channel) return message.channel.send('**⚠️ - Invalid channel, please provide a mention or an ID .**');
				settingData.setting = channel.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set apply channel to <#${channel.id}> .**`);
			}
		}

		if (setting.toLowerCase() == 'applysend') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current apply sending channel is <#${settingData.setting}> .**`); }
			else {
				const channel = message.mentions.channels.first() || client.channels.cache.get(newset[1]);
				if (!channel) return message.channel.send('**⚠️ - Invalid channel, please provide a mention or an ID .**');
				settingData.setting = channel.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set applications channel to <#${channel.id}> .**`);
			}
		}

		if (setting.toLowerCase() == 'family') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current family role is \`${message.guild.roles.cache.get(settingData.setting).name}\` .**`); }
			else {
				const role = message.mentions.roles.first() || message.guild.roles.cache.get(newset[0]);
				if (!role) return message.channel.send('**⚠️ - Invalid role, please provide a mention or an ID .**');
				settingData.setting = role.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set family role to \`${role.name}\` .**`);
			}
		}

		if (setting.toLowerCase() == 'event') {
			if (!newset[0]) { return message.channel.send(`**🔍 - Current event role is \`${message.guild.roles.cache.get(settingData.setting).name}\` .**`); }
			else {
				const role = message.mentions.roles.first() || message.guild.roles.cache.get(newset[0]);
				if (!role) return message.channel.send('**⚠️ - Invalid role, please provide a mention or an ID .**');
				settingData.setting = role.id;
				settingData.save();
				message.channel.send(`**✅ Successfully set event role to \`${role.name}\` .**`);
			}
		}

		if (setting.toLowerCase() == 'ticket') {
			if (!newset[0]) {
				const cate = settingData.setting;
				message.channel.send(`**🔍 - Current tickets category/s: \`${cate.map((value) => message.guild.channels.cache.get(value).name).join('`, `')}\` .**`);
			}
			else {
				const todb = [];
				newset.forEach((value) => {
					const room = message.guild.channels.cache.get(value);
					if (!room) return;
					if (room.type !== 'category') return;
					todb.push(room.id);
				});
				settingData.setting = todb;
				settingData.save();
				message.channel.send(`**🔍 - Successfully set tickets category/s to: \`${todb.map((value) => message.guild.channels.cache.get(value).name).join('`, `')}\` .**`);
			}
		}

		if (setting.toLowerCase() == 'ticketclosed') {
			if (!newset[0]) {
				const cate = settingData.setting;
				message.channel.send(`**🔍 - Current closed tickets category: \`${message.guild.channels.cache.get(cate).name}\` .**`);
			}
			else {
				const room = message.guild.channels.cache.get(newset[0]);
				if (!room) return;
				if (room.type !== 'category') return;
				settingData.setting = room.id;
				settingData.save();
				message.channel.send(`**🔍 - Successfully set tickets category to: \`${message.guild.channels.cache.get(room.id).name}\` .**`);
			}
		}

		if (setting.toLowerCase() == 'staff') {
			if (!newset[0]) {
				const roles = settingData.setting;
				message.channel.send(`**🔍 - Current staff role/s: \`${roles.map((value) => message.guild.roles.cache.get(value).name).join('`, `')}\` .**`);
			}
			else {
				const todb = [];
				newset.forEach((value) => {
					const role = message.guild.roles.cache.get(value);
					if (!role) return;
					todb.push(role.id);
				});
				settingData.setting = todb;
				settingData.save();
				message.channel.send(`**🔍 - Successfully set staff role/s to: \`${todb.map((value) => message.guild.roles.cache.get(value).name).join('`, `')}\` .**`);
			}
		}

		if (setting.toLowerCase() == 'suggrole') {
			if (!newset[0]) {
				const roles = settingData.setting;
				message.channel.send(`**🔍 - Current suggestion role/s: \`${roles.map((value) => message.guild.roles.cache.get(value).name).join('`, `')}\` .**`);
			}
			else {
				const todb = [];
				newset.forEach((value) => {
					const role = message.guild.roles.cache.get(value);
					if (!role) return;
					todb.push(role.id);
				});
				settingData.setting = todb;
				settingData.save();
				message.channel.send(`**🔍 - Successfully set suggestion role/s to: \`${todb.map((value) => message.guild.roles.cache.get(value).name).join('`, `')}\` .**`);
			}
		}
	},
};
