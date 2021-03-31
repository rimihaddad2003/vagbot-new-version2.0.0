module.exports = {
  name: "hide",
  desc: "Allow you to show the channel from everyone or from a specific member",
  category: "management",
  perms: ["administrator"],
  usage: "[user]",
  cooldown: 3000,
  run: (client, message, args) => {
    const user =
      message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user)
      return message.channel
        .updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false })
        .then(() =>
          message.channel.send("**✅ - Successfully hidded this channel .**")
        );
    else
      return message.channel
        .updateOverwrite(user, { VIEW_CHANNEL: false })
        .then(() =>
          message.channel.send(
            `**✅ - Successfully prevented ${user} from viewing this channel .**`
          )
        );
  },
};
