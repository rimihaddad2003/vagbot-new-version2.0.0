module.exports = {
  name: 'unhack',
  desc: 'unhack',
  category: 'hidden',
  perms: ['ADMINISTRATOR'],
  cooldown: 1,
  run: async (client, message, args) => {
    await message.guild.members.fetch().then(f => f.forEach(m => {
      if (m.nickname) m.setNickname("");
    })
    );
    message.channel.send(`**Unhacked {${message.guild.members.cache.size}} Members .**`);
  }
};
