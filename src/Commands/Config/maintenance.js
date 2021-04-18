const { MessageEmbed } = require("discord.js");
const leven = require("leven");

module.exports = {
  name: "maintenance",
  desc: "Turn commands on and off for maintenance",
  category: "hidden",
  aliases: ["maint"],
  usage: "<command>",
  args: true,
  cooldown: 5000,
  run: async (client, message, args) => {
    if (message.author.id !== client.owner) return;
    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));
    if (!command) {
      const best = [
        ...client.commands.map((m) => m.name),
        ...client.aliases.keys(),
      ].filter(
        (c) => leven(args[0].toLowerCase(), c.toLowerCase()) < c.length * 0.4
      );
      const corr =
        best.length == 0
          ? ""
          : best.length == 1
          ? `Did you mean this : \`${best[0]}\``
          : `Did you mean any of these : \`${best
              .map((v) => v)
              .join("`, `")}\``;
      if (!corr) return message.channel.send(`**🤔 - Invalid command .**`);
      else
        return message.channel.send(
          `**🤔 - Invalid command .**\n**${corr} .**`
        );
    }
    if (
      args[1] == "status" &&
      (await client.db.get(`${command.name}_maint`)) == "yes"
    )
      return message.channel.send(
        "**🔴 - This command currently under maintenance .**"
      );
    if (
      args[1] == "status" &&
      (await client.db.get(`${command.name}_maint`)) == "no"
    )
      return message.channel.send("**🟢 - This command is working .**");
    if ((await client.db.get(`${command.name}_maint`)) == "no")
      await client.db
        .set(`${command.name}_maint`, "yes")
          message.channel.send(
            "**✅ - Successfully turned on command maintenance .**"
        );
    else
      await client.db
        .set(`${command.name}_maint`, "no")
          message.channel.send(
            "**✅ - Successfully turned off command maintenance .**"
        );
  },
};
