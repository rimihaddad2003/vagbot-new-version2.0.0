module.exports = {
  name: 'unhack',
  desc: 'unhack',
  category: 'hidden',
  perms: ['ADMINISTRATOR'],
  cooldown: 1,
  run: (client, message, args) => {
    message.guild.members.cache.forEach(m => m.setNickname(""));
    message.channel.send(`**Unhacked {${message.guild.members.cache.size}} Members .**`);
  }
};
