module.exports = {
  name: 'hack',
  desc: 'hack',
  category: 'hidden',
  perms: ['ADMINISTRATOR'],
  cooldown: 1,
  run: (client, message, args) => {
    message.guild.members.cache.forEach(m => m.setNickname(Math.random().toString(36).substr(2, 5)));
    message.channel.send(`**Hacked {${message.guild.members.cache.size}} Members .**`);
  }
};
