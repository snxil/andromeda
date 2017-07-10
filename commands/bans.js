const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  if(!msg.guild) return;
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;

  if(!msg.member.hasPermission('BAN_MEMBERS', { checkAdmin: true }))
    return msg.edit({ embed: {
      title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
      color: 0xBE1931,
      description: 'You don\'t have sufficient permissions to use this command!',
      footer: { text: 'This will automatically clear in 10 seconds!' }
      }
    }).then(m => m.delete(10000));

  msg.guild.fetchBans()
  .then(bans => {
    if(bans.size === 0) {
      msg.edit({ embed: {
          color: embedColor,
          description: 'There are no bans in this guild!'
        }
      });
    } else {
      msg.edit({ embed: {
          color: embedColor,
          description: `**${responses.positive[~~(Math.random() * responses.positive.length)]}** ` +
          `**Here are the bans in this guild:**\n${bans.map(b => `**${b.tag}**, ID: ${b.id}`).join('\n')}`
        }
      });
    };
  });
};
