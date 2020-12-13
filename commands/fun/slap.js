const { MessageEmbed } = require("discord.js");

const client = require('nekos.life')
const neko = new client()

exports.run = async (client, message, args) => {
  
    const User = message.mentions.users.first() 
    if(!User) return message.channel.send('You need to mentions someone!')
  
  var link = await neko.sfw.slap()
  const {
    url
  } = link
  console.log(url)

  const embed = new MessageEmbed()
  .setTitle(`${message.author.username} slapped ${User.username} !`)
  .setImage(url)
  message.channel.send(embed)

}

exports.help = {
 name: "slap",
 description: "Slap",
 category: "fun",
 usage: "slap [mentions]"
}

// sabar njrit

exports.conf = {
 aliases: [""],
 cooldown: 10
}