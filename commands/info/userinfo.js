const { MessageEmbed } = require("discord.js");
const moment = require("moment");

const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "House of Bravery",
  HOUSE_BRILLIANCE: "House of Brilliance",
  HOUSE_BALANCE: "House of Balance",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer"
};

// sini jad
// pantes, exports dahek
exports.run = async (client, message, args) => {
  const member = message.mentions.members.array()[0] || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);
  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  const embed = new MessageEmbed()
    .setColor("grey")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setDescription(``)
    .addField("User", [
      `**❯ Username:** ${member.user.username}`,
      `**❯ Discriminator:** ${member.user.discriminator}`,
      `**❯ ID:** ${member.id}`,
      `**❯ Flags:** ${
        userFlags.length
          ? userFlags.map(flag => flags[flag]).join(", ")
          : "None"
      }`,
      `**❯ Time created:** ${moment(member.user.createdTimestamp).format(
        "LT"
      )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
        member.user.createdTimestamp
      ).fromNow()}`,
      `**❯ Status:** ${member.user.presence.status}`,
      `**❯ Game:** ${member.user.presence.game || "Not playing a game."}`,
      "\u200b"
    ])
    .addField("Member", [
      `**❯ Highest role:** ${
        member.roles.highest.id === message.guild.id
          ? "None"
          : member.roles.highest.name
      }`,
      `**❯ Joined this server at:** ${moment(member.joinedAt).format(
        "LL LTS"
      )}`,
      `**❯ Hoist role:** ${
        member.roles.hoist ? member.roles.hoist.name : "None"
      }`,
      `**❯ Roles [${roles.length}]:** ${
        roles.length < 10
          ? roles.join(", ")
          : roles.length > 10
          ? client.utils.trimArray(roles)
          : "None"
      }`
    ])
    .setTimestamp();

  message.channel.send(embed);
};

exports.help = {
  name: "userinfo",
  description: "Display about info user`s",
  category: "info",
  usage: "userinfo [mentions]"
};

exports.conf = {
  aliases: ["user", "whois"],
  cooldown: 10
};
