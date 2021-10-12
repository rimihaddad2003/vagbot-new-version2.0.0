const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const request = require('request');
const pointsSchema = require('../../Models/pointsModel');
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const menu1 = new MessageMenu()
	.setID('reasons')
	.setPlaceholder('Select a Reason:')
	.setMaxValues(1)
	.setMinValues(1)
	.addOptions([
		new MessageMenuOption().setLabel('• Swearing .').setDescription('- 24 Hours .').setValue('swear'),
		new MessageMenuOption().setLabel('• Annoying .').setDescription('- 10 Hours .').setValue('ann'),
		new MessageMenuOption().setLabel('• Spamming .').setDescription('- 8 Hours .').setValue('spam'),
		new MessageMenuOption().setLabel('• Disrespecting .').setDescription('- 16 Hours .').setValue('disrespect'),
		new MessageMenuOption().setLabel('• Misusing Room .').setDescription('- 6 Hours .').setValue('room'),
		new MessageMenuOption().setLabel('• Advertising .').setDescription('- 3 Days .').setValue('adv'),
		new MessageMenuOption().setLabel('• Others .').setDescription('- Custom reason / time .').setValue('other'),
	]);

module.exports = {
	name: 'regproof',
	desc: 'Register the proofs in the Staff\'s Server',
	category: 'staff',
	aliases: ['rp'],
	usage: '<subject>',
	cooldown: 1,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {Array} args
	 */
	run: async (client, message) => {
		if (message.guild.id !== '826914852487692359') return message.channel.send('**• This command works in Vagmemes Staff Server only .**');
		const filter = m => m.author.id == message.author.id;
		const pointsData = await pointsSchema.findOne({ staff: message.author.id })
			? await pointsSchema.findOne({ staff: message.author.id })
			: new pointsSchema({
				staff: message.author.id,
				tickets: 0,
				proofs: 0,
			});
		pointsData.save();
		message.channel.send('**• Vagmemes Proof Registration System .**', menu1).then(async msg => {
			let reason;
			let time;
			let user;
			let note;
			let photo;

			client.on('clickButton', async button => {
				if (button.message.id !== msg.id || button.clicker.id !== message.author.id) return;
				throw Error('testing');
			});
			client.on('clickMenu', async menu => {
				try {
					if (menu.message.id !== msg.id || menu.clicker.id !== message.author.id) return;
					if (menu.values[0] == 'other') {
						msg.edit({ content: '**• Send the reason:**', components: [] });
						await msg.channel.awaitMessages(filter, { max: 1 }).then(got => {
							reason = got.first().content;
							got.first().delete();
						});
						msg.edit('**• Send the time of the mute/ban:**');
						await msg.channel.awaitMessages(filter, { max: 1 }).then(got => {
							time = got.first().content;
							got.first().delete();
						});
					}
					else if (menu.values[0] == 'swear') {
						reason = 'Swearing';
						time = '24 Hours';
					}
					else if (menu.values[0] == 'ann') {
						reason = 'Annoying';
						time = '10 Hours';
					}
					else if (menu.values[0] == 'spam') {
						reason = 'Spamming';
						time = '8 Hours';
					}
					else if (menu.values[0] == 'disrespect') {
						reason = 'Disrespecting';
						time = '16 Hours';
					}
					else if (menu.values[0] == 'room') {
						reason = 'Misusing Room';
						time = '6 Hours';
					}
					else if (menu.values[0] == 'adv') {
						reason = 'Advertising';
						time = '3 Days';
					}
					msg.edit({ content: '**• Send the user ID:**', components: [] });
					await msg.channel.awaitMessages(filter, { max: 1 }).then(async got => {
						user = await client.users.fetch(got.first().content).catch(() => { });
						got.first().delete();
					});
					if (!user) throw '**• This ID isn\'t valid. **';

					msg.edit('**• Attach a photo or send a direct photo url:**');
					await msg.channel.awaitMessages(filter, { max: 1 }).then(async got => {
						if (got.first().attachments.first()) {
							photo = got.first().attachments.first().url;
						}
						else {
							photo = got.first().content;
						}
						got.first().delete();
					});

					const ext = photo.split('.').slice(-1)[0];
					request(photo).pipe(fs.createWriteStream(`./src/Photos/Proof.${ext}`));

					msg.edit('**• Send an additional note __(optional)__:**');
					await msg.channel.awaitMessages(filter, { max: 1 }).then(async got => {
						note = got.first().content;
						got.first().delete();
					});
					const embed = new MessageEmbed()
						.setColor(client.color)
						.setTitle('# - VagProof')
						.setThumbnail(message.guild.iconURL())
						.setDescription(`**• Name »** ${user.tag}\n**• ID »** ${user.id}\n**• Staff »** ${message.author}\n**• Reason »** ${reason}\n**• Length »** ${time}\n**• Note »** ${note}`)
						.attachFiles([`./src/Photos/Proof.${ext}`])
						.setImage(`attachment://Proof.${ext}`)
						.setTimestamp()
						.setFooter(`• Proof number » ${pointsData.proofs + 1}`);
					client.channels.cache.get('861357803947556874').send(embed).then(m => {
						pointsData.proofs++;
						pointsData.save();
						message.channel.send(`**✅ - Successfully registered the proof, Your proofs total points:\`${pointsData.proofs}\` .**\n${m.url}`);
					});
					msg.delete();
				}
				catch (m) {
					message.channel.send(m);
					msg.delete();
				}
			});
		});
	},
};