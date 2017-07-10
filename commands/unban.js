const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  if(!msg.guild) return;
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  let error = { // Error embed
    title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
    color: 0xBE1931,
    description: parseInt(args[0]) ? 'You don\'t have sufficient permissions to use this command!'
    : 'You have specify an ID to unban!',
    footer: { text: 'This will automatically clear in 10 seconds!' }
  };

  if(!args[0] || !parseInt(args[0]) || !msg.member.hasPermission('BAN_MEMBERS', { checkAdmin: true }))
    return msg.edit({ embed: error }).then(m => m.delete(10000));

  msg.guild.unban(args[0])
  .then(() => {
    msg.edit({ embed: {
        color: embedColor,
        description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Successfully unbanned ID **${args[0]}** from ${msg.guild.name}! :heart:`
      }
    });
  })
  .catch(() => {
    msg.edit({ embed: error }).then(message => message.delete(10000));
  });
};
