const { writeFile } = require("fs");
const { MessageEmbed } = require("discord.js");
const request = require("request");

module.exports = {
  name: "mcstatus",
  desc: "Shows you some information about Vagmemes minecraft server",
  category: "general",
  aliases: ["mc"],
  cooldown: 20000,
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`# - ${client.botname}Status`)
      .setDescription(
        "**The current status of Vagmemes Minecraft server with some statistics .**"
      )
      .setFooter(`Request by ${message.author.username}`)
      .setTimestamp()
      .setColor(client.color)
      .addField("• IP »", "- play.Vagmemes.com", true)
      .addField("• Port »", "- 25565", true);
    const url = "https://api.mcsrvstat.us/2/vagmemes.com";
    await request(url, async (err, response, body) => {
      if (err) {
        console.error(err);
        message.channel.send("**An error occurred .**");
      } else {
        body = JSON.parse(body);
        if (!body.online) {
          embed.addField("• Status »", "- Offline");
        } else {
          embed
            .addField("• Status »", "- Online")
            .addField("• Online Players »", `- ${body.players.online}`, true)
            .addField("• Max Players »", `- ${body.players.max}`, true);
          if (body.icon) {
            const imagebase = body.icon.split("base64,");
            await writeFile(
              "./src/Photos/Vagicon.png",
              imagebase[1],
              { encoding: "base64" },
              () => console.log("Vagicon.png Created!")
            );
            embed
              .attachFiles(["./src/Photos/Vagicon.png"])
              .setThumbnail("attachment://Vagicon.png");
          }
        }
      }
      message.channel.send(embed);
    });
  },
};
