const {
  loadImage,
  createCanvas,
  registerFont
} = require('canvas');
const {
  MessageAttachment
} = require('discord.js');
const wlcmimg = `${__dirname}/../../Photos/Welcome.png`;


module.exports = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    const messages = [
      `**Everyone, please welcome ${member} !**`,
      `**- Is it the end of world? no wait it's just ${member} showing up !**`,
      `**- The legend says that ${member} will enjoy the server !**`,
      `**- hey ${member}, we have been waiting for you !**`,
      `**- I heard that ${member} is coming from the future to our server !**`,
      `**- News: Someone called ${member} joined Vagmemes server today !**`,
      `**- If you don't welcome ${member}, you will get bad luck for 50 years !**`,
    ];

    const canvas = createCanvas(2200, 1239);
    const ctx = canvas.getContext('2d');

    const pfp = await loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    );

    const background = await loadImage(wlcmimg);
    let x = 0;
    let y = 0;
    ctx.drawImage(background, x, y, 2200, 1239);

    x = canvas.width / 2 - 738;
    y = canvas.height / 2 - 454;
    ctx.beginPath();
    ctx.save();
    ctx.arc(canvas.width / 2 - 290, canvas.height / 2 - 2, 450, 0, Math.PI * 2);
    ctx.lineWidth = 15;
    ctx.clip();
    ctx.drawImage(pfp, x, y, 899, 899);
    ctx.restore();

    ctx.font = "bold 110px Uni-Sans";
    ctx.fillStyle = 'white';
    ctx.fillText(member.user.username, 1300, 850);

    const attachment = new MessageAttachment(canvas.toBuffer());
    const channel = await client.db.get('welcome_channel');
    client.channels.cache.get(channel).send(messages[Math.floor(Math.random() * messages.length)], attachment);
  }
};
