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
		if (setting == 'suggestions') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current suggestion channel is <#${await client.db.get(
						'sugg_channel',
					)}> .**`,
				);
			}
			else {
				const channel =
					message.mentions.channels.first() ||
					message.guild.channels.cache.get(newset[0]);
				if (!channel) {
					return message.channel.send(
						'**⚠️ - Invalid channel, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('sugg_channel', channel.id);
				message.channel.send(
					`**✅ Successfully set suggestions channel to <#${channel.id}> .**`,
				);
			}
		}
		if (setting == 'logs') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current logs channel is <#${await client.db.get(
						'logs_channel',
					)}> .**`,
				);
			}
			else {
				const channel =
					message.mentions.channels.first() ||
					message.guild.channels.cache.get(newset[0]);
				if (!channel) {
					return message.channel.send(
						'**⚠️ - Invalid channel, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('logs_channel', channel.id);
				message.channel.send(
					`**✅ Successfully set logs channel to <#${channel.id}> .**`,
				);
			}
		}
		if (setting == 'welcome') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current welcome channel is <#${await client.db.get(
						'welcome_channel',
					)}> .**`,
				);
			}
			else {
				const channel =
					message.mentions.channels.first() ||
					message.guild.channels.cache.get(newset[0]);
				if (!channel) {
					return message.channel.send(
						'**⚠️ - Invalid channel, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('welcome_channel', channel.id);
				message.channel.send(
					`**✅ Successfully set welcome channel to <#${channel.id}> .**`,
				);
			}
		}
		if (setting == 'apply') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current apply channel is <#${await client.db.get(
						'apply_channel',
					)}> .**`,
				);
			}
			else if (newset[0] == 'send') {
				const channel =
					message.mentions.channels.first() ||
					client.channels.cache.get(newset[1]);
				if (!channel) {
					return message.channel.send(
						'**⚠️ - Invalid channel, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('applysend_channel', channel.id);
				message.channel.send(
					`**✅ Successfully set applications channel to <#${channel.id}> .**`,
				);
			}
			else {
				const channel =
					message.mentions.channels.first() ||
					message.guild.channels.cache.get(newset[0]);
				if (!channel) {
					return message.channel.send(
						'**⚠️ - Invalid channel, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('apply_channel', channel.id);
				message.channel.send(
					`**✅ Successfully set apply channel to <#${channel.id}> .**`,
				);
			}
		}
		if (setting == 'family') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current family role is \`${message.guild.roles.cache.get(await client.db.get('fam_role')).name
					}\` .**`,
				);
			}
			else {
				const role =
					message.mentions.roles.first() ||
					message.guild.roles.cache.get(newset[0]);
				if (!role) {
					return message.channel.send(
						'**⚠️ - Invalid role, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('fam_role', role.id);
				message.channel.send(
					`**✅ Successfully set family role to \`${role.name}\` .**`,
				);
			}
		}
		if (setting == 'luck') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current luck role is \`${message.guild.roles.cache.get(await client.db.get('luck_role')).name
					}\` .**`,
				);
			}
			else {
				const role =
					message.mentions.roles.first() ||
					message.guild.roles.cache.get(newset[0]);
				if (!role) {
					return message.channel.send(
						'**⚠️ - Invalid role, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('luck_role', role.id);
				message.channel.send(
					`**✅ Successfully set luck role to \`${role.name}\` .**`,
				);
			}
		}
		if (setting == 'event') {
			if (!newset[0]) {
				message.channel.send(
					`**🔍 - Current event role is \`${message.guild.roles.cache.get(await client.db.get('event_role'))
						.name
					}\` .**`,
				);
			}
			else {
				const role =
					message.mentions.roles.first() ||
					message.guild.roles.cache.get(newset[0]);
				if (!role) {
					return message.channel.send(
						'**⚠️ - Invalid role, please provide a mention or an ID .**',
					);
				}
				await client.db
					.set('event_role', role.id);
				message.channel.send(
					`**✅ Successfully set event role to \`${role.name}\` .**`,
				);
			}
		}
		if (setting == 'ticket') {
			if (!newset[0]) {
				const cate = await client.db.get('ticket_ch');
				message.channel.send(
					`**🔍 - Current tickets category/s: \`${cate
						.map((value) => message.guild.channels.cache.get(value).name)
						.join('`, `')}\` .**`,
				);
			}
			else {
				const todb = [];
				newset.forEach((value) => {
					const room = message.guild.channels.cache.get(value);
					if (!room) return;
					if (room.type !== 'category') return;
					todb.push(room.id);
				});
				await client.db.set('ticket_ch',
					todb);
				message.channel.send(
					`**🔍 - Successfully set tickets category/s to: \`${todb
						.map((value) => message.guild.channels.cache.get(value).name)
						.join('`, `')}\` .**`,
				);
			}
		}
		if (setting == 'staff') {
			if (!newset[0]) {
				const role = await client.db.get('staff_role');
				message.channel.send(
					`**🔍 - Current staff role/s: \`${role
						.map((value) => message.guild.roles.cache.get(value).name)
						.join('`, `')}\` .**`,
				);
			}
			else {
				const todb = [];
				newset.forEach((value) => {
					const role = message.guild.roles.cache.get(value);
					if (!role) return;
					todb.push(role.id);
				});
				await client.db.set('staff_role',
					todb);
				message.channel.send(
					`**🔍 - Successfully set staff role/s to: \`${todb
						.map((value) => message.guild.roles.cache.get(value).name)
						.join('`, `')}\` .**`,
				);
			}
		}
	},
};
