const fetch = require('node-fetch');

const subreddits = [
	'memes',
	'DeepFriedMemes',
	'bonehurtingjuice',
	'surrealmemes',
	'dankmemes',
	'meirl',
	'me_irl',
	'funny'
];

const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  		const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		const selected = data[Math.floor(Math.random() * data.length)];
  const embed = new MessageEmbed()
  .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
	message.channel.send(embed);
}

exports.help = {
 name: "meme",
 description: "Send a meme",
 category: "fun",
 usage: "v.meme"
}

exports.conf = {
 aliases: [""],
 cooldown: 5
}