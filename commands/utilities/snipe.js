const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const msg = client.snipes.get(`${message.guild.id}_${message.channel.id}`);
  if (!msg) return message.channel.send(`There's nothing to snipe!`);

  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(
    msg.author.tag,
    msg.author.displayAvatarURL({ dynamic: true, size: 256 })
  )
  .setDescription(msg.content)
  .setTimestamp(msg.createdAt);
  
  if (msg.attachment) embed.setImage(msg.attachment);
  
  message.channel.send(embed);
};

//     coba commandnya
exports.help = {
  name: "snipe",
  description: "Snipe!",
  category: "utility",
  usage: "snipe"
};

exports.conf = {
  aliases: [],
  cooldown: 5
};
