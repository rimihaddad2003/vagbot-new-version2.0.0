const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const glob = require('glob');
const { promisify } = require('util');
const globPro = promisify(glob);
const boxes = ['lucky', 'mythic'];

module.exports = {
	name: 'luck',
	desc: 'Open a random box for an event or a reward',
	args: true,
	usage: '<box> ["open"]',
	cooldown: 5000,
	category: 'utility',
	run: async (client, message, args) => {
		if (!message.member.roles.cache.has(await client.db.get('luck_role'))) {
			return message.channel.send(
				'**⚠️ - You don\'t have the required role .**',
			);
		}
		const shuffleArray = (arr) => {
			for (let i = arr.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		};
		const open = async (box) => {
			const photos = {
				background: `${__dirname}/../../Photos/${box}BG.png`,
				prizes: await globPro(`${__dirname}/../../Photos/${box}Box/*.png`),
			};
			const canvas = Canvas.createCanvas(2218, 1250);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#000000';
			const BG = await Canvas.loadImage(photos.background);
			ctx.drawImage(BG, 0, 0, canvas.width, canvas.height);

			shuffleArray(photos.prizes);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[0]),
				220,
				760,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[1]),
				700,
				760,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[2]),
				1180,
				760,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[3]),
				220,
				340,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[4]),
				700,
				340,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[5]),
				1180,
				340,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[6]),
				1660,
				340,
				300,
				300,
			);
			ctx.drawImage(
				await Canvas.loadImage(photos.prizes[7]),
				1660,
				760,
				300,
				300,
			);
			const attachment = new MessageAttachment(canvas.toBuffer());
			message.channel.send(attachment);
		};
		if (boxes.includes(args[0].toLowerCase())) {
			if (args[1] !== 'open') {
				return message.channel.send({
					files: [
						{
							attachment: `${__dirname}/../../Photos/${client.bettercase(
								args[0],
							)}Main.png`,
							name: `${client.bettercase(args[0])}Box.png`,
						},
					],
				});
			}
			if (args[1] == 'open') return open(client.bettercase(args[0]));
		}
		else {
			return message.channel.send(
				`**⚠️ - Invalid box, try one of these: \`${boxes.join('`, `')}\` .**`,
			);
		}
	},
};
