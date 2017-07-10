const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  let startTime = new Date();

  try {
    const code = args.join(' ');
    let evaled = eval(code);

    msg.edit({ embed: {
        author: { name: 'Eval Success!', icon_url: client.user.displayAvatarURL },
        color: embedColor,
        description: `**Type:** ${typeof evaled}`,
        fields: [{
          name: ':inbox_tray: Input',
          value: '```js\n' + code + '```'
        },
        {
          name: ':outbox_tray: Output',
          value: '```js\n' + evaled + '```'
        }],
        footer: {
          text: `Code evaluated in ${new Date() - startTime}ms`,
          icon_url: 'https://i.imgur.com/CEvdMEd.png'
        }
      }
    });
  }
  catch(e) {
    msg.edit({ embed: {
        title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
        color: 0xBE1931,
        description: '```' + e + '```',
        footer: { text: 'This will automatically clear in 10 seconds!' }
      }
    }).then(m => m.delete(10000));
  };
};
