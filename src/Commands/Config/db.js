module.exports = {
	name: 'db',
	desc: 'get db file',
	category: 'hidden',
	perms: ['Administrator'],
	cooldown: 10000,
	run: (client, message) => {
		message.author.send({
			files: [{
				attachment: `${__dirname}/../../../json.sqlite`,
				name: 'json.sqlite',
			},
			],
		});
	},
};