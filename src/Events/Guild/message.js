const ms = require('ms');
const leven = require('leven');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (
			message.author.bot ||
			!message.guild ||
			!message.content.toLowerCase().startsWith(client.prefix)
		) { return; }
		const [cmd, ...args] = message.content
			.trim()
			.slice(client.prefix.length)
			.split(/ +/g);
		const command =
			client.commands.get(cmd.toLowerCase()) ||
			client.commands.get(client.aliases.get(cmd.toLowerCase()));
		if (!command) {
			const best = [
				...client.commands.map((m) => m.name),
				...client.aliases.keys(),
			].filter(
				(c) => leven(cmd.toLowerCase(), c.toLowerCase()) < c.length * 0.4,
			);
			const corr =
				best.length == 0
					? ''
					: best.length == 1
						? `Did you mean this : \`${best[0]}\``
						: `Did you mean any of these : \`${best
							.map((v) => v)
							.join('`, `')}\``;
			if (!corr) { return message.channel.send('**🤔 - Invalid command .**'); }
			else {
				return message.channel.send(
					`**🤔 - Invalid command .**\n**${corr} .**`,
				);
			}
		}

		if (
			message.author.id !== client.owner &&
			(await client.db.get(`${command.name}_maint`)) == 'yes'
		) { return message.channel.send('**🚧 - This command under maintenance .**'); }

		if (
			command.perms &&
			!message.member.permissions.has(
				command.perms.map((v) => v.toUpperCase()) ?? [],
			)
		) {
			return message.channel.send(
				`**🚫 - You don't have any of the required permissions: \`${command.perms
					.map((value) =>
						client.bettercase(
							value.toLowerCase().replace(/guild/g, 'server').replace(/_/g, ' '),
						),
					)
					.join('`, `')}\`**`,
			);
		}
		if (client.cooldowns.has(`${message.author.id}_${command.name}`)) {
			if (
				client.cooldowns.get(`${message.author.id}_${command.name}`) -
				Date.now() >
				1000
			) {
				return message.channel
					.send(
						`**⏳ - You have to wait \`${ms(
							client.cooldowns.get(`${message.author.id}_${command.name}`) -
							Date.now(),
							{
								long: true,
							},
						)}\` before running this command again .**`,
					)
					.then((msg) =>
						msg.delete({
							timeout:
								client.cooldowns.get(`${message.author.id}_${command.name}`) -
								Date.now(),
						}),
					);
			}
			else {
				return message.channel
					.send(
						`**⏳ - You have to wait \`${ms(1000, {
							long: true,
						})}\` before running this command again .**`,
					)
					.then((msg) =>
						msg.delete({
							timeout: 1000,
						}),
					);
			}
		}
		if (command.args == true && !args.length) {
			return message.channel.send(
				`**⚠️ - This command require arguments, try \`${client.prefix + cmd.toLowerCase()
				} ${command.usage}\`**`,
			);
		}
		try {
			await command.run(client, message, args);
			if (command.cooldown) {
				client.cooldowns.set(
					`${message.author.id}_${command.name}`,
					Date.now() + command.cooldown,
				);
				setTimeout(() => {
					client.cooldowns.delete(`${message.author.id}_${command.name}`);
				}, command.cooldown);
			}
		}
		catch (err) {
			message.channel
				.send(`**❌ - An error occurred .**\n\`\`\`${err.message}\`\`\``)
				.then((msg) => msg.delete({ timeout: 3000 }));
			console.error(err);
		}
	},
};
