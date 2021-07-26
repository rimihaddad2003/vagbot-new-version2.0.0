const request = require('request');
const url = 'https://api.mcsrvstat.us/2/vagmemes.com';
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'ready',
	run: (client) => {
		setInterval(async () => {
			const settingData = await settingSchema.findOne({ option: 'status' });
			const prestatus = settingData.setting;
			let aftervar = prestatus.name;
			console.log(prestatus);
			if (prestatus.name.includes('{mcp}')) {
				request(url, (err, response, body) => {
					if (err) {
						console.log(err);
						return (aftervar = aftervar.replace('{mcp}', 'Error'));
					}
					body = JSON.parse(body);
					if (!body.online) aftervar = aftervar.replace('{mcp}', 'Offline');
					else aftervar = aftervar.replace('{mcp}', body.players.online);
				});
			}
			if (prestatus.name.includes('{dsm}')) {
				aftervar = aftervar.replace(
					'{dsm}',
					client.guilds.cache.get(prestatus.guild).memberCount,
				);
			}
			if (prestatus.name.includes('{dso}')) {
				aftervar = aftervar.replace(
					'{dso}',
					client.guilds.cache
						.get(prestatus.guild)
						.members.cache.filter((u) => u.presence.status !== 'offline').size,
				);
			}
			setTimeout(() => {
				client.user.setPresence({
					activity: {
						name: aftervar,
						type: prestatus.type,
					},
				});
			}, 2000);
		}, 10000);
	},
};
