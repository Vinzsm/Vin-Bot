const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) {
    return message.channel.send(`You know that you can't use this command right?`);
  }

  await message.channel.send(`Restarting bot...`);
  process.exit();
};

exports.help = {
  name: "restart",
  description: "Restarting bot",
  category: "owner",
  usage: "v.restart"
};

exports.conf = {
  aliases: ["reboot"],
  cooldowns: 10
};
