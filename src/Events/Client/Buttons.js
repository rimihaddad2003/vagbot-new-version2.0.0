const { MessageButton } = require('discord-buttons');
const { MessageEmbed, Client } = require('discord.js');

module.exports = {
	name: 'clickButton',
	/**
	 * 
	 * @param {Client} client 
	 * @param {} button 
	 */
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
			button.reply.send('**🎉 - مبروك ربحت الجائزة... تواصل مع المسؤولين للاستلام .**', true);
			client.users.cache.get(client.owner).send(`**Someone won the prize:**\n${button.message.url}`);
		}
	},
};