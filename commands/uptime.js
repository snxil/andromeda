const moment = require('moment'); // Require moment
const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  let d = moment.duration(~~(process.uptime()), 'seconds');

  msg.edit('', {embed: {
      color: config.embeds.useRoleColor ?
      (msg.guild ? msg.guild.me.displayColor : embedColor)
      : embedColor,
      description: d.hours() ? (d.days()
      ? `Selfbot has been active for ${d.days()} days, ${d.hours()} hours, ${d.minutes()} minutes, and ${d.seconds()} seconds! :black_heart:`
      : `Selfbot has been active for ${d.hours()} hours, ${d.minutes()}, and ${d.seconds()} seconds! :black_heart:`)
      : `Selfbot has been active for ${d.minutes()} minutes and ${d.seconds()} seconds! :black_heart:`
    }
  });
  console.log(msg.guild ? `Uptime command was used in ${msg.guild.name}, ${msg.guild.id}!`
  : 'Uptime command was used!');
}
