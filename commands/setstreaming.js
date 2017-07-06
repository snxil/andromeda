const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  let argsJoin = args.join(' ');
  client.user.setGame(argsJoin, 'https://www.twitch.tv/twitch'); // Set the game

  let confirm = [
    'Can-do!',
    'No problemo!',
    'Done!',
    'Mission accomplished!',
    'Roger-that!',
    'Aye aye, Captain!'
  ];

  if(!argsJoin) {
    msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `${confirm[~~(Math.random() * confirm.length)]} Current game has been removed! :black_heart:`
      }
    }).then(message => message.delete(10000));
    console.log('The game has been reset!');
  } else {
    msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `${confirm[~~(Math.random() * confirm.length)]} Now streaming **${argsJoin}** :black_heart:`
      }
    }).then(message => message.delete(10000));
    console.log(`The game has been set to '${argsJoin}' and streaming!`)
  };
};
