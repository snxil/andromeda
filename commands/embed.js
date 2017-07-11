const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  let embedDescription = args.join(' ');
  if(!embedDescription) return msg.edit({ embed: {
      title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
      color: 0xBE1931,
      description: 'You have to specify a description to create an embed, silly!',
      footer: { text: 'This will automatically clear in 10 seconds!' }
    }
  }).then(m => m.delete(10000));

  let embedColor = /^#[0-9A-F]{6}/i.test(args[0]) ? parseInt(args[0].replace('#', '0x'))
  : (config.embeds.useRoleColor ? (msg.guild ? msg.guild.me.displayColor
  : dColor) : dColor);

  msg.edit({ embed: {
      color: embedColor,
      description: /^#[0-9A-F]{6}/i.test(args[0]) ? embedDescription.split(' ').slice(1).join(' ')
      : embedDescription
    }
  });
};
