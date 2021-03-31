module.exports = {
  name: "lock",
  desc:
    "Allow you to prevent a specific member or all members from typing in a channel",
  category: "management",
  perms: ["administrator"],
  usage: "[user]",
  cooldown: 3000,
  run: (client, message, args) => {
    const user =
      message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user)
      return message.channel
        .updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false })
        .then(() =>
          message.channel.send("**✅ - Successfully locked this channel .**")
        );
    else
      return message.channel
        .updateOverwrite(user, { SEND_MESSAGES: false })
        .then(() =>
          message.channel.send(
            `**✅ - Successfully prevented ${user} from typing in this channel .**`
          )
        );
  },
};
