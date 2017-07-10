const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
exports.run = function(client, msg, args) {
  let d = moment.duration(~~(process.uptime()), 'seconds');
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;

  msg.edit('', {embed: {
      color: embedColor,
      description: d.hours() ? (d.days()
      ? `Selfbot has been active for ${d.days()} days, ${d.hours()} hours, ${d.minutes()} minutes, and ${d.seconds()} seconds! :black_heart:`
      : `Selfbot has been active for ${d.hours()} hours, ${d.minutes()}, and ${d.seconds()} seconds! :black_heart:`)
      : `Selfbot has been active for ${d.minutes()} minutes and ${d.seconds()} seconds! :black_heart:`
    }
  });
};
