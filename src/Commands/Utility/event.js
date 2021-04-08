const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "event",
  desc: "start or end an event by reaction roles",
  category: "utility",
  usage: "<start/end>",
  args: true,
  cooldown: 10000,
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has(await client.db.get("event_role")))
      return message.channel.send(
        "**⚠️ - You don't have the required role .**"
      );
    if (args[0] == "start") {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`# - ${client.botname}Event`)
        .setThumbnail(
          message.guild.iconURL({
            dynamic: true,
          })
        )
        .setFooter(
          `Hosted By » ${message.author.username}`,
          message.author.avatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setDescription(
          "• If you want to receive this event's notifications, click on the 🎉 below .\n• إذا كنت تريد أن يصلك إشعارات هذه الفعالية، إضغط على 🎉 بالأسفل ."
        );
      message.channel.send(embed).then((msg) => {
        msg.react("🎉");
        message.guild.roles
          .create({
            data: {
              name: "N.Event",
              color: "BLUE",
            },
          })
          .then(async (role) => {
            const option = {
              msg: msg.id,
              role: role.id,
            };
            await client.db.set("event_noti", option);
          });
      });
      message.delete();
    } else if (args[0] == "end") {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`# - ${client.botname}Event`)
        .setThumbnail(
          message.guild.iconURL({
            dynamic: true,
          })
        )
        .setFooter(
          `Hosted By » ${message.author.username}`,
          message.author.avatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setDescription(
          "• This is the end of today's event, we hope you like it .\n• هذه نهاية فعالية اليوم، نتمنى أنكم استمتعتم ."
        );
      const option = await client.db.get("event_noti");
      if (!option) return message.channel.send('**🤔 - There isn\'t any running event .**');
      message.channel.send(embed)
      message.guild.roles.cache.get(option.role).delete();
      await client.db.set("event_noti", false);
    }
  },
};
