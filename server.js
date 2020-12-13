const Discord = require("discord.js");
const VinBot = require("./handler/Client.js");
const client = new VinBot();
const { token } = require('./config.json');

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.login(process.env.TOKEN).catch(console.error);