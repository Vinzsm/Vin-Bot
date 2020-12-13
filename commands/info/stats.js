const Discord = require("discord.js")
const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json')
const moment = require("moment");
const { utc } = require('moment')
let os = require('os')
const ms = require("ms")

exports.run = async (client, message, args) => {
    const core = os.cpus()[0]
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor('grey')
			.addField('General', [
				`**❯ Client:** ${client.user.tag} (${client.user.id})`,
				`**❯ Commands:** ${client.commands.size}`,
				`**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${client.users.cache.size}`,
				`**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
			])
			.setTimestamp()

		message.channel.send(embed)
}
  
exports.help = {
 name: "stats",
 description: "Displaying bot info",
 category: "info",
 usage: "stats"
}

exports.conf = {
 aliases: ["bot"],
 cooldown: 10
}