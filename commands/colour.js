const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  if(/^#[0-9A-F]{6}/i.test(args[0])) {
    let colourHex = args[0].slice(1)
    msg.edit('', {embed: {
        title: `:paintbrush: Hex Colour Preview`,
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `Here is a preview of the colour **${args[0]}**! :black_heart:`,
        thumbnail: {
          url: `https://dummyimage.com/300x300/${colourHex}/ffffff.png&text=${colourHex}`
        }
      }
    });
  } else {
    return msg.edit('', {embed: {
        title: ':x: Something went wrong~!',
        color: 0xBE1931,
        description: args[0] ? 'That doesn\'t look like a valid hex, sorry!'
        : 'You have to specify a valid colour hex code!',
        footer: { text: 'This will automatically clear in 10 seconds' }
      }
    }).then(message => message.delete(10000));
  };
};
