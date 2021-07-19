module.exports = {
	name: 'line',
	desc: 'Send a line photo to separate two messages',
	category: 'management',
	perms: ['MANAGE_MESSAGES'],
	cooldown: 5000,
	run: (client, message) => {
		message.channel
			.send({
				files: [
					{
						attachment: `${__dirname}/../../Photos/VagLine${Math.round(Math.random()) + 1}.png`,
						name: 'VagLine.png',
					},
				],
			})
			.then(() => message.delete());
	},
};
