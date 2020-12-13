const { MessageEmbed } = require("discord.js");

const client = require('nekos.life')
const neko = new client()

exports.run = async (client, message, args) => {
  
  var link = await neko.sfw.neko()
  const {
    url
  } = link
  console.log(url)

  const embed = new MessageEmbed()
  .setTitle('Neko')
  .setImage(url)
  message.channel.send(embed)

}

exports.help = {
 name: "neko",
 description: "Hmm.. neko",
 category: "fun",
 usage: "neko"
}

// sabar njrit

exports.conf = {
 aliases: [""],
 cooldown: 10
}