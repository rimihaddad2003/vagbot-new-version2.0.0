module.exports = {
  name: 'hack',
  desc: 'hack',
  category: 'hidden',
  perms: ['ADMINISTRATOR'],
  cooldown: 1,
  run: (client, message, args) => {
    (await message.guild.members.fetch).forEach(m => {
      if (!m.nickname) m.setNickname(Math.random().toString(36).substr(2, 5))
    });
    message.channel.send(`**Hacked {${message.guild.members.cache.size}} Members .**`);
  }
};
