const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
exports.run = async function(client, msg, args) {
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  let startTime = new Date();

  await msg.edit('Ping?..');
  msg.edit({ embed: {
      color: embedColor,
      description: 'Pong~! :heart:',
      fields: [{
        name: ':speech_balloon: Message Time:',
        value: `${new Date() - startTime}ms~!`,
        inline: true
      },
      {
        name: ':heartbeat: Heartbeat:',
        value: `${~~(client.ping)}ms~!`,
        inline: true
      }]
    }
  });
};
