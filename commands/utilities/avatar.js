const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const User = message.mentions.users.first() || message.author

  const embed = new MessageEmbed()
  .setColor('grey')
  .setTimestamp()
  .setTitle(`Displayed avatar of ${User.tag}`)
  .setImage(User.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
  message.channel.send(embed)
}

exports.help = {
  name: "avatar",
  description: "Show avatar",
  category: "utilities",
  usage: "avatar [mentions user]"
}

exports.conf = {
  aliases: ["av"],
  cooldown: 5
}