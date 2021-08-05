const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clickButton',
	run: async (client, button) => {
		if (button.id == 'firstevent') {
			const s = new MessageButton()
				.setStyle('gray')
				.setID('firstevent')
				.setLabel('Someone won!')
				.setEmoji('🎉')
				.setDisabled();
			const embed = new MessageEmbed(button.message.embeds[0]);
			embed.setDescription(embed.description.replace('No one yet', button.clicker.user));
			button.message.edit(embed, s);
			button.reply.send('**🎉 - مبروك ربحت الجائزة ... تواصل مع المسؤولين للاستلام .**', true);
		}
	},
};