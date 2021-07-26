const request = require('request');
const url = 'https://api.mcsrvstat.us/2/vagmemes.com';
const settingSchema = require('../../Models/settingModel');

module.exports = {
	name: 'ready',
	run: (client) => {
		setInterval(async () => {
			const settingData = await settingSchema.findOne({ option: 'status' });
			const status = settingData.setting;
			const name = status.name;
			let aftername = status.name;
			if (name.includes('{mcp}')) {
				request(url, (err, response, body) => {
					if (err) {
						console.log(err);
						return (aftername = aftername.replace('{mcp}', 'Error'));
					}
					body = JSON.parse(body);
					if (!body.online) aftername = aftername.replace('{mcp}', 'Offline');
					else aftername = aftername.replace('{mcp}', body.players.online);
				});
			}
			if (name.includes('{dsm}')) {
				aftername = aftername.replace(
					'{dsm}',
					client.guilds.cache.get(status.guild).memberCount,
				);
			}
			if (status.name.includes('{dso}')) {
				aftername = aftername.replace(
					'{dso}',
					client.guilds.cache
						.get(status.guild)
						.members.cache.filter((u) => u.presence.status !== 'offline').size,
				);
			}
			setTimeout(() => {
				client.user.setPresence({
					activity: {
						name: aftername,
						type: status.type,
					},
				});
			}, 2000);
		}, 10000);
	},
};
