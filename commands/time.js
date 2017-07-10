const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
exports.run = function(client, msg, args) {
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  msg.edit('', {embed: {
      color: embedColor,
      description: `The time is currently **${require('moment')().format('dddd, MMMM Do, h:mm:ss A')}**! :black_heart:`
    }
  });
};
