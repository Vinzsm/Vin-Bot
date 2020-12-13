const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
	if (message.partial) await message.fetch();

	if (!message.guild || message.channel.type === "dm") return; 
	if (message.author.bot || message.author === client.user) return;
  
  client.snipes.set(`${message.guild.id}_${message.channel.id}`, message);
  
  setTimeout(() => client.snipes.delete(`${message.guild.id}_${message.channel.id}`), 120000);
};