const config = require('../config/config.json');

exports.run = function(client, msg, args) {
  let embedDescription = args.join(' ');

  if(!embedDescription) return msg.edit('', {embed: {
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    description: 'I can\'t create a blank embed, sorry!',
    footer: { text: 'This will automatically clear in 10 seconds' }
    }
  }).then(message => message.delete(10000));

  let embedColor = parseInt(/^#[0-9A-F]{6}/i.test(args[0]))
  ? parseInt(args[0].replace('#', '0x')) : parseInt(config.embeds.defaultColor);

  msg.edit('', {embed: {
      color: testColor ? embedColor
      : (config.embeds.useRoleColor ?
      (msg.guild ? msg.guild.me.displayColor : embedColor)
      : embedColor),
      description: testColor ? embedDescription.split(' ').slice(1).join(' ')
      : embedDescription
    }
  });
};
