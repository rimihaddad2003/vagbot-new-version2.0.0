const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'help',
	desc: 'List all the available commands with information on each of them',
	cooldown: 5000,
	usage: '[command]',
	category: 'general',
	aliases: ['cmds', 'commands'],
	run: (client, message, args) => {
		if (!args.length) {
			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`# - ${client.botname}Help`)
				.setDescription(`**Bot's prefix: \`${client.prefix}\`**`)
				.setTimestamp()
				.setFooter(
					`Requested By ${message.author.username}`,
					message.author.avatarURL({
						dynamic: true,
					}),
				)
				.setThumbnail(
					message.guild.iconURL({
						dynamic: true,
					}),
				);
			[...client.categories].forEach((value) => {
				if (!value || value == 'Hidden') return;
				embed.addField(
					`• ${value} [${client.commands.filter(
						(m) => m.category.toLowerCase() == value.toLowerCase(),
					).size
					}] »`,
					`- \`${client.commands
						.filter((m) => m.category.toLowerCase() == value.toLowerCase())
						.map((v) => v.name)
						.join('`, `')}\``,
				);
			});
			message.channel.send(embed);
		}
		else {
			const cmd =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.get(client.aliases.get(args[0].toLowerCase()));
			if (!cmd || !cmd.category || client.bettercase(cmd.category) == 'Hidden') {
				return message.channel.send(
					'**🤔 - This command isn\'t available, check the spelling then try again .**',
				);
			}
			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`# - ${client.botname}Help » ${client.bettercase(cmd.name)}`)
				.setDescription(`**${cmd.desc}.**`)
				.setTimestamp()
				.addField('• Category »', `- ${client.bettercase(cmd.category)}`)
				.setThumbnail(
					message.guild.iconURL({
						dynamic: true,
					}),
				)
				.setFooter(
					`Requested by ${message.author.username}`,
					message.author.avatarURL({
						dynamic: true,
					}),
				);
			if (cmd.usage) {
				embed.addField(
					'• Usage »',
					`- ${client.prefix + cmd.name} ${cmd.usage
					}\n*<> : Required / [] : Optional*`,
				);
			}
			if (cmd.aliases) {embed.addField('• Aliases »', `- \`${cmd.aliases.join('`, `')}\``);}
			if (cmd.perms) {
				embed.addField(
					'• Permissions »',
					`- \`${cmd.perms
						.map((v) =>
							client.bettercase(
								v.toLowerCase().replace(/guild/g, 'server').replace(/_/g, ' '),
							),
						)
						.join('`, `')}\``,
				);
			}
			if (cmd.cooldown) {
				embed.addField(
					'• Cooldown »',
					`- ${ms(cmd.cooldown, {
						long: true,
					})}`,
				);
			}
			message.channel.send(embed);
		}
	},
};
