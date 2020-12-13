const { MessageEmbed } = require('discord.js')
const moment = require('moment')

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
}

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
}

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
    sydney: 'Sydney',
    undefined: 'None',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
}

exports.run = async (client, message, args) => {

              const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
            const members = message.guild.members.cache
            const channels = message.guild.channels.cache
            const emojis = message.guild.emojis.cache

            const embed = new MessageEmbed()
            .setColor('grey')
            .setDescription(`${message.guild.name} info`)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .addField('General', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.owner.id})`,
                `**❯ Region:** ${regions[message.guild.region]}`,
                `**❯ Boost tier:** ${message.guild.premiumTier ? `Tier: ${message.guild.premiumTier}` : 'None'}`,
                `**❯ Explicit filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Time created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField('Statistics', [
                `**❯ Roles count:** ${roles.length}`,
                `**❯ Emoji count:** ${emojis.size}`,
                `**❯ Regurlar emoji count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**❯ Animated emoji count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**❯ Member count:** ${message.guild.memberCount}`,
                `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
                `**❯ Text channels:** ${channels.filter(member => channels.type === 'text').size}`,
                `**❯ Voice channels:** ${channels.filter(member => channels.type === 'voice').size}`,
                `**❯ Boost count:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**❯ Do not disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
            .addField(`Roles [${roles.length}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? client.utils.trimArray(roles) : 'None')
            .setTimestamp()
  
            message.channel.send(embed)
  
}

exports.help = {
 name: "serverinfo",
 description: "Display info server\`s",
 category: "info",
 usage: "serverinfo"
}

exports.conf = {
 aliases: ["server"],
 cooldown: 20
}