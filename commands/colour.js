const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  if(/^#[0-9A-F]{6}/i.test(args[0])) {
    let colorHex = args[0].slice(1)
    msg.edit({ embed: {
        title: ':paintbrush: Hex Preview!',
        color: parseInt(args[0].replace('#', '0x')),
        description: `Here is a preview of the colour **${args[0]}**! :heart:`,
        thumbnail: { url: `https://dummyimage.com/300x300/${colorHex}/ffffff.png&text=${colorHex}` }
      }
    });
  } else {
    msg.edit({ embed: {
        title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
        color: 0xBE1931,
        description: 'That doesn\'t look like a valid hex, sorry!\n' +
        'Please specify a valid hex code, such as `#123456`',
        footer: { text: 'This will automatically clear in 10 seconds!' }
      }
    }).then(m => m.delete(10000));
  };
};
