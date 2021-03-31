const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  desc: "Shows both the Discord API and the bot ping",
  cooldown: 10000,
  category: "general",
  run: (client, message) => {
    message.channel.send("Pinging...").then((msg) => {
      msg.delete();
      message.channel.send(
        new MessageEmbed()
          .setColor(client.color)
          .setTitle(`# - ${client.botname}Ping`)
          .setDescription(
            `**- Discord API » \`${
              client.ws.ping
            }ms\` .**\n**- Bot's Ping » \`${
              msg.createdTimestamp - message.createdTimestamp
            }ms\` .**`
          )
          .setThumbnail(
            message.guild.iconURL({
              dynamic: true,
            })
          )
          .setTimestamp()
          .setFooter(
            `Requested By ${message.author.username}`,
            message.author.avatarURL({
              dynamic: true,
            })
          )
      );
    });
  },
};
