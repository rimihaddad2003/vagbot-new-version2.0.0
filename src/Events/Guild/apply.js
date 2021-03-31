const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "message",
  run: async (client, message) => {
    if (message.channel.id !== await client.db.get('apply_channel')) return;
    if (message.author.bot) return;
    const channel = client.channels.cache.get(await client.db.get('applysend_channel'));
    const embed = new MessageEmbed()
    .setTitle(`# - ${client.botname}Apply`)
    .setDescription(message.content)
    .setFooter(`Name: ${message.author.username}\nID: ${message.author.id}`)
    .setColor(client.color)
    .setTimestamp();
    channel.send(embed);
    message.delete();
    message.channel.send(`**📨 - Your Application has been sent to our staff .**`)
    .then(msg => msg.delete({timeout: 7000}));
  },
};