const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  };

  if(!args[0]) return msg.edit('', {embed: {
        title: ':x: Something went wrong~!',
        color: 0xBE1931,
        description: 'You have to specify code to eval, sorry!',
        footer: { text: 'This will automatically clear in 10 seconds' }
      }
    }).then(message => message.delete(10000));

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    //if (typeof evaled !== "string")
      //evaled = require("util").inspect(evaled);

    msg.edit('', {embed: {
        author: {
          name: `Evaluated Code`,
          icon_url: client.user.displayAvatarURL
        },
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `**Type:** ${typeof evaled}`,
        fields: [{
          name: ':inbox_tray: Input',
          value: '```js\n' + clean(code) + '```'
        },
        {
          name: ':outbox_tray: Output',
          value: '```js\n' + clean(evaled) + '```'
        }],
        footer: { text: 'Andromeda v0.1.1 by cosmoscodes' }
      }
    });
    console.log(msg.guild ? `Evaluated code in ${msg.guild.name}, ID: ${msg.guild.id}!`
    : 'Evaluated code!');
  }
  catch(err) {
    msg.edit('', {embed: {
        title: ':x: Something went wrong~!',
        color: 0xBE1931,
        description: '```' + clean(err) + '```',
        footer: { text: 'This will automatically clear in 10 seconds' }
      }
    }).then(message => message.delete(10000));
  }
};
