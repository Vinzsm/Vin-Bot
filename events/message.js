const Discord = require("discord.js"),
  cooldowns = new Discord.Collection();
const fs = require("fs");
const db = require("quick.db");
const ms = require("ms");

module.exports = async (client, message) => {
  // shoob
  if (message.author.id === "673362753489993749") {
    let checkEmbed = message.embeds[0];
    if (!checkEmbed) return;

    if (!checkEmbed.description) return;
    if (checkEmbed && checkEmbed.description.includes(":green:")) {
      let thisEmbed = checkEmbed.description;
      let pusherClaim = thisEmbed.slice(30, 48);
      const pusher = checkEmbed.description.split(" ")[1];
      const Tier = db.get(`spawn123_${message.guild.id}_card_tier`);

      if (!client.config.reminder.includes(pusherClaim)) return;
      if (Tier == "1") {
        db.set(`remind.${pusherClaim}_t1`, [`${Date.now() + ms("2m")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t1`)) {
            db.delete(`remind.${pusherClaim}_t1`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T1 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }

      if (Tier == "2") {
        db.set(`remind.${pusherClaim}_t2`, [`${Date.now() + ms("10m")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t2`)) {
            db.delete(`remind.${pusherClaim}_t2`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T2 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }

      if (Tier == "3") {
        db.set(`remind.${pusherClaim}_t3`, [`${Date.now() + ms("30m")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t3`)) {
            db.delete(`remind.${pusherClaim}_t3`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T3 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }

      if (Tier == "4") {
        db.set(`remind.${pusherClaim}_t4`, [`${Date.now() + ms("4h")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t4`)) {
            db.delete(`remind.${pusherClaim}_t4`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T4 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }

      if (Tier == "5") {
        db.set(`remind.${pusherClaim}_t5`, [`${Date.now() + ms("6h")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t5`)) {
            db.delete(`remind.${pusherClaim}_t5`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T5 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }

      if (Tier == "6") {
        db.set(`remind.${pusherClaim}_t6`, [`${Date.now() + ms("1d")}`]);

        const interval = setInterval(function() {
          if (Date.now() > db.fetch(`remind.${pusherClaim}_t6`)) {
            db.delete(`remind.${pusherClaim}_t6`);
            message.channel
              .send(`**Reminder:** ${pusher} You can claim T6 again`)
              .catch(e => console.log(e));
            clearInterval(interval);
          }
        }, 1000);
      }
    }

    if (!checkEmbed.title) return;
    if (message.guild.id === "752036554272145408") return;
    if (checkEmbed && checkEmbed.title.includes(" Tier: ")) {
            const nameCard = checkEmbed.title.replace();
      const terakhir = nameCard.split(` `).length;
      const Tier = nameCard.split(` `)[terakhir - 1];

      db.set(`spawn123_${message.guild.id}_card_tier`, [`${Tier}`]);
      const nye = db.get(`spawn123_${message.guild.id}_card_tier`);
      
      let countdown = 15;
      const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(countdown + " seconds until despawned.");

      message.channel.send(embed).then(msg => {
        let interval = setInterval(function() {
          countdown = countdown - 2;
          if (countdown < 0) {
            if (msg.deletable) msg.delete();
            clearInterval(interval);
          } else {
            const embed = new Discord.MessageEmbed()
              .setColor(
                countdown > 5 ? (countdown > 10 ? "GREEN" : "ORANGE") : "RED"
              )
              .setDescription(countdown + " seconds until despawned.");
            msg.edit(embed);
          }
        }, 2000);
      });
    }
  }
  //   penutup shoob

  if (message.content == `<@747810519402020944>`) {
    message.channel.send(
      `<@${message.author.id}> My prefix on ${message.guild.name} is \`${client.config.prefix}\``
    );
  }

  if (message.author.bot || message.author === client.user) return;

  let prefix = client.config.prefix;
  if (!message.content.startsWith(prefix)) return;

  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;

  let commandFile =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;

  if (!cooldowns.has(commandFile.help.name))
    cooldowns.set(commandFile.help.name, new Discord.Collection());

  const member = message.member,
    now = Date.now(),
    timestamps = cooldowns.get(commandFile.help.name),
    cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        `Too fast, please wait **${timeLeft.toFixed(
          1
        )}** seconds to try the command again.`
      );
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
    return;
  } catch (error) {
    console.log(error.message);
  }
};
