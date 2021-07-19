module.exports = {
	name: 'test',
	desc: 'test',
	cooldown: 1,
	category: 'hidden',
	run: (client, message) => {
		message.channel.send(Math.round(Math.random()) + 1);
	},
};