const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  let error = { // Error embed
    title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
    color: 0xBE1931,
    description: 'Status must be either `online`, `idle`, `dnd`, or `invisible`!',
    footer: { text: 'This will automatically clear in 10 seconds!' }
  };

  if(!args[0]) return msg.edit({ embed: error })
  .then(m => m.delete(10000));

  if(['online', 'idle', 'dnd', 'invisible'].indexOf(args[0]) !== -1) {
    client.user.setStatus(args[0]).then(() => {
      msg.edit({ embed: {
          color: args[0] === 'online' ? 0x43B581
          : (args[0] === 'idle' ? 0xFAA61A
          : (args[0] === 'dnd' ? 0xBE1931
          : 0x747F8D)),
          description: `Status has been set to **${args[0]}**! :heart:`
        }
      }).then(m => m.delete(5000));
      console.log(`Status has been set to '${args[0]}'!`);
    });
  } else {
    msg.edit({ embed: error }).then(m => m.delete(10000));
  };
};
