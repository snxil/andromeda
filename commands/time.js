const moment = require('moment'); // Require moment
const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  msg.edit('', {embed: {
      color: config.embeds.useRoleColor ?
      (msg.guild ? msg.guild.me.displayColor : embedColor)
      : embedColor,
      description: `The time is currently **${moment().format('dddd, MMMM Do, h:mm:ss A')}**! :black_heart:`
    }
  });
  console.log(msg.guild ? `The time command was used in ${msg.guild.name}, ${msg.guild.id}!`
  : 'The time command was used!');
}
