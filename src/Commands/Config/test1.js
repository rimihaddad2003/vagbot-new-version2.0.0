module.exports = {
	name: 'test',
	desc: 'test',
	cooldown: 1,
	category: 'hidden',
	run: (client, message) => {
		client.emit('guildMemberAdd', message.member);
	},
};