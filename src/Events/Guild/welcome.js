const {
	loadImage,
	createCanvas,
	registerFont,
} = require('canvas');
const {
	MessageAttachment,
} = require('discord.js');
const wlcimg = `${__dirname}/../../Photos/Welcome.png`;
registerFont(`${__dirname}/../../Fonts/Changa.ttf`, { family: 'Changa' });


module.exports = {
	name: 'guildMemberAdd',
	run: async (client, member) => {
		if (member.guild.id !== '739132110006124654') return;
		const messages = [
			`**• Everyone, please welcome ${member} !**`,
			`**• Is it the end of world? no wait it's just ${member} showing up !**`,
			`**• The legend says that ${member} will enjoy the server !**`,
			`**• hey ${member}, we have been waiting for you !**`,
			`**• I heard that ${member} is coming from the future to our server !**`,
			`**• News: Someone called ${member} joined Vagmemes server today !**`,
			`**• If you don't welcome ${member}, you will get bad luck for 50 years !**`,
			`**• Is this real?? ${member} himself joined our server !**`,
			`**• Attention everyone ${member} is here !**`,
			`**• We introduce to you the one and only ${member} !**`,
		];

		const canvas = createCanvas(1166, 656);
		const ctx = canvas.getContext('2d');

		const pfp = await loadImage(
			member.user.displayAvatarURL({
				format: 'png',
			}),
		);

		const background = await loadImage(wlcimg);
		let x = 0;
		let y = 0;
		ctx.drawImage(background, x, y, 1166, 656);

		x = canvas.width / 2 - 375;
		y = canvas.height / 2 - 153;
		ctx.beginPath();
		ctx.save();
		ctx.arc(canvas.width / 2 - 235, canvas.height / 2 - 13, 140, 0, Math.PI * 2);
		ctx.clip();
		ctx.drawImage(pfp, x, y, 280, 280);
		ctx.restore();

		ctx.font = 'bold 70px Changa';
		ctx.fillStyle = 'white';
		ctx.fillText(member.user.username, 510, 375);

		const attachment = new MessageAttachment(canvas.toBuffer());
		const channel = await client.db.get('welcome_channel');
		client.channels.cache.get(channel).send(messages[Math.floor(Math.random() * messages.length)], attachment);
	},
};
