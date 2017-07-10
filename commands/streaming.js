const config = require('../config/config.json');
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  let argsJoin = args.join(' ');

  client.user.setGame(argsJoin, 'https://www.twitch.tv/twitch');
  if(!argsJoin) {
    msg.edit({ embed: {
        color: 0x593695,
        description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Current game has been removed! :heart:`
      }
    }).then(m => m.delete(10000));
    console.log('Current game has been removed!');
  } else {
    msg.edit({ embed: {
      color: 0x593695,
      description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Now streaming **${argsJoin}**! :heart:\n` +
      'This status won\'t show for you, but it will for others, don\'t worry!'
      }
    }).then(m => m.delete(10000));
    console.log(`Now streaming '${argsJoin}'!`);
  };
};
