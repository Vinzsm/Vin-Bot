module.exports = client => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setStatus('online');
  
  const interval = setInterval(function() {

   client.user.setActivity(`${client.users.cache.size} users and ${client.guilds.cache.size} guilds | v.help`, { type: 'WATCHING' })
  }, 1000)
  client.user.setActivity(`${client.users.cache.size} users and ${client.guilds.cache.size} guilds | v.help`, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error)
  
}