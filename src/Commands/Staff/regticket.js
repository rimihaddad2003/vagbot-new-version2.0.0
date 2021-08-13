const { MessageEmbed } = require('discord.js');
const settingSchema = require('../../Models/settingModel');
const pointsSchema = require('../../Models/pointsModel');
const ms = require('pretty-ms');

module.exports = {
	name: 'regticket',
	desc: 'Register the tickets in the Staff\'s Server',
	category: 'staff',
	aliases: ['rt'],
	usage: '<subject>',
	args: true,
	cooldown: 20000,
	run: async (client, message, args) => {
		const channels = await settingSchema.findOne({ option: 'ticketclosed' });
		if (!channels.setting.includes(message.channel.parentID)) return;
		const roles = await settingSchema.findOne({ option: 'staff' });
		if (!message.member.roles.cache.some(role => roles.setting.includes(role.id))) return message.channel.send('**🚫 - This command is for staff only .**');

		const pointsData = await pointsSchema.findOne({ staff: message.author.id })
			? await pointsSchema.findOne({ staff: message.author.id })
			: new pointsSchema({
				staff: message.author.id,
				tickets: 0,
				proofs: 0,
			});
		pointsData.save();

		async function fetcher(channel) {
			const sum_messages = [];
			let last_id;
			for (; ;) {
				const options = { limit: 100 };
				if (last_id) {
					options.before = last_id;
				}

				const messages = await channel.messages.fetch(options);
				sum_messages.push(...messages.array());
				last_id = messages.last().id;

				if (messages.size != 100) {
					break;
				}
			}
			return sum_messages;
		}
		const subject = args.join(' ');
		const messages = await fetcher(message.channel);
		const first = messages[messages.length - 1];
		let last;
		messages.forEach(m => {
			if (!m.embeds[0] && m.author.id !== '557628352828014614') return;
			const embed = new MessageEmbed(m.embeds[0]);
			if (embed.color !== 13840175) return;
			last = m;
		});
		const user = first.mentions.users.first();
		const time = ms(last.createdTimestamp - first.createdTimestamp, { verbose: true, secondsDecimalDigits: 0 });
		const number = message.channel.name.split('-')[1];

		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`# - ${client.botname}Ticket`)
			.setThumbnail('https://images-ext-1.discordapp.net/external/OQVxBXI1gsuShsNjUj9FS23G-g7octCTS3sSi-iwGdY/https/cdn.discordapp.com/avatars/860570645208104981/18478085c0241e0ec8a8edebf823ea6e.webp')
			.setDescription(`• Name » ${user.username}\n• ID » ${user.id}\n• Staff » ${message.author}\n• Subject » ${subject}\n• Channel » <#${message.channel.id}>\n• Number » ${number}\n• Time » ${time}`)
			.setTimestamp()
			.setFooter(`• Ticket number » ${pointsData.tickets + 1}`);
		client.channels.cache.get('861357782795026432').send(embed).then(msg => {
			pointsData.tickets++;
			pointsData.save();
			message.channel.send(`**✅ - Successfully registered the ticket .**\n${msg.url}`);
		});
	},
};