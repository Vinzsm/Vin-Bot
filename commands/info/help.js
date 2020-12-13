const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = client.config.prefix;
  
  if (!args[0]) {
    // This will turn the folder (category) into array.
    let module = client.helps.array();
    
    // This will hide a folder from display that includes "hide: true" in their module.json
    if (!client.config.owners.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new Discord.MessageEmbed()
    .setColor("grey")
    .setDescription(`Use \`${prefix}help [command]\` to get more help!\nExample: \`${prefix}help ping\``)
    .setAuthor("Help Menu | " + message.guild.name + "", message.guild.iconURL())
    .setTimestamp()
    
    for (const mod of module) {
      // You can change the .join(", ") to dots or every symbol.
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(", "));
    }
    
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    
    // If the user type the [command], also with the aliases.
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = command.help.name; // The command name.
      let desc = command.help.description; // The command description.
      let cooldown = command.conf.cooldown; // The command cooldown.
      let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "No aliases provided.";
      let usage = command.help.usage ? command.help.usage : "No usage provided.";
      let example = command.help.example ? command.help.example : "No example provided.";
      
      let embed = new Discord.MessageEmbed()
      .setColor("#FFD700")
      .setAuthor("Help: " + name + " | " + message.guild.name + "", message.guild.iconURL())
      .setDescription('**Command Name**: `' + name + '`\n**Command Aliases**: `' + aliases + '`\n**Command Cooldown**: `' + cooldown + 's`\n**Command Description**: ' + desc + '.\n**Command Usage**: `' + usage + '`\n**Command Examples**:\n ```' + example + '```')
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      return message.channel.send(embed);
    } else {
      // If the user type the wrong command.
      return message.channel.send({embed: {color: "RED", description: "Unknown command."}});
    }
  }
}

exports.help = {
  name: "help",
  description: "Show a command list.",
  usage: "help [command]",
  example: "help Moderation"
}

exports.conf = {
  aliases: ["?"],
  cooldown: 10
}