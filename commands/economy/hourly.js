const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  db.set(`cd_hourly_${message.author.id}`, [`${Date.now() + ms("10s")}`]);

  const interval = setInterval(function() {
    if (Date.now() > db.fetch(`cd_hourly_${message.author.id}`)) {
      db.delete(`cd_hourly_${message.author.id}`);
    }
  }, 1000);

  if (Date.now() > db.fetch(`cd_hourly_${message.author.id}`)) {
    let rng = Math.floor(
      Math.random() * 100 + Math.random() * 50 + Math.random() * 50
    );
    const min = 75;
    const max = 125;
    message.channel.send(rng);

    if (rng < min) {
      const minus = min - rng;
      rng = rng + minus;
    }

    if (rng > max) {
      rng = max;
    }

    message.channel.send(rng);
    db.add(`money_${message.guild.id}_${message.author.id}`, rng);
  }

  if (Date.now() < db.get(`cd_hourly_${message.author.id}`)) {
    message.channel.send(
      `<@${message.author.id}>, you can claim your hourly reward in ${ms(
        db.get(`cd_hourly_${message.author.id}`)
      )}`
    );
  }
};

exports.help = {
  name: "hourly",
  description: "",
  category: "economy",
  usage: "hourly"
};

exports.conf = {
  aliases: ["hr"],
  cooldowns: 5
};
