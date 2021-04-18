module.exports = {
  name: 'db',
  desc: 'get db file',
  category: 'hidden',
  perms: ['Administrator'],
  cooldown: 10000,
  run: (client, message, args) => {
    message.author.send({
      files: [{
        attachment: `${__dirname}/../../../json.sqlite`,
        name: 'json.sqlite',
      },
      ],
    })
  }
}