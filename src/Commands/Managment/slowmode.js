const ms = require('ms');

module.exports = {
	name: 'slowmode',
	desc: 'Change the channel\'s slowmode',
	category: 'management',
	aliases: ['sm', 'cooldown'],
	perms: ['MANAGE_CHANNELS'],
	usage: '[time]',
	cooldown: 5000,
	run: (client, message, args) => {
		if (!args[0]) {
			return message.channel
				.setRateLimitPerUser(0)
				.then(() =>
					message.channel.send('**:turtle: - Channel\'s cooldown turned off .**'),
				);
		}
		const unit = args[0].slice(-1);
		const num = args[0].slice(0, -1);
		if (isNaN(num)) {
			return message.channel.send(
				'**:thinking: - Please use a valid number .**',
			);
		}
		if (unit !== 's' && unit !== 'm' && unit !== 'h') {
			return message.channel.send(
				'**🤔 - Please enter a valid unit (s/m/h) .**',
			);
		}
		if (ms('6h') < ms(args[0]) || ms(args[0]) < 0) {
			return message.channel.send(
				'**⚠️ - Time must bebetween `1 second` and `6 hours` .**',
			);
		}
		message.channel.setRateLimitPerUser(ms(args[0]) / 1000).then(() =>
			message.channel.send(
				`**:turtle: - Channel's cooldown set to \`${ms(ms(args[0]), {
					long: true,
				})}\` .**`,
			),
		);
	},
};
