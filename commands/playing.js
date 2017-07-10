const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  let argsJoin = args.join(' ');

  client.user.setGame(argsJoin);
  if(!argsJoin) {
    msg.edit({ embed: {
        color: embedColor,
        description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Current game has been removed! :heart:`
      }
    }).then(m => m.delete(10000));
    console.log('Current game has been removed!');
  } else {
    msg.edit({ embed: {
      color: embedColor,
      description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Now playing **${argsJoin}**! :heart:\n` +
      'This status won\'t show for you, but it will for others, don\'t worry!'
      }
    }).then(m => m.delete(10000));
    console.log(`Now playing '${argsJoin}'!`);
  };
};
