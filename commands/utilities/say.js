const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    if (client.config.owners.includes(message.author.id)) {
      message.channel.send(args.join(" "));
    }
}

exports.help = {
  name: "say",
  description: "Say anything",
  category: "utilities",
  usage: "say [arguments]"
}

exports.conf = {
  aliases: [""],
  cooldown: 5
}