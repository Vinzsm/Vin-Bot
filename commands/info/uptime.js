const { MessageEmbed } = require("discord.js");
const ms = require('ms')

exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor('grey')
    .setDescription(`Uptime`)
    .setTimestamp()
    .addField('Bot uptime :', `${ms(client.uptime, { long : true})}`)
    message.channel.send(embed)

}

exports.help = {
 name: "uptime",
 description: "Send bot\`s uptime",
 category: "info",
 usage: "uptime"
}

exports.conf = {
 aliases: [""],
 cooldown: 10
}