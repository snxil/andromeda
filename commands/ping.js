const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = async function(client, msg, args) {
  let startTime = new Date();
  await msg.edit('Ping?..');
  msg.edit('', {embed: {
      color: config.embeds.useRoleColor ?
      (msg.guild ? msg.guild.me.displayColor : embedColor)
      : embedColor,
      description: 'Pong~! :black_heart:\n' +
      `Message took ~\`${new Date() - startTime}ms\`, and client ping is around \`${~~(client.ping)}ms\`!`
    }
  });
  console.log(msg.guild ? `Ping command was used in ${msg.guild.name}, ${msg.guild.id}!`
  : 'Ping command was used!');
};
