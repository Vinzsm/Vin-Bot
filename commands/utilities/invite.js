const { MessageEmbed } = require("discord.js");

// jan lupa put exports nya lol
exports.run = async (client, message, args) => {
  let embed = new MessageEmbed()
  .setDescription("[Invite me to your server!](https://discord.com/oauth2/authorize?client_id=747810519402020944&scope=bot&permissions=2147483647)");
  
  message.channel.send(embed);
}

exports.help = {
  name: "invite",
  description: "Invite the bot",
  category: "utilities",
  usage: "v.invite [no argument]"
}

exports.conf = {
  aliases: ["inv"],
  cooldown: 5
}