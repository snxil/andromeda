exports.run = function(client, msg, args) {
  let error = { // Error embed
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    description: args[0] ? 'Status must be either `online`, `idle`, `dnd`, or `invisible`, sorry!'
    : 'You have to specify a status, sorry!',
    footer: { text: 'This will automatically clear in 10 seconds' }
  };

  if(!args[0]) return msg.edit('', { embed: error }).then(message => message.delete(10000));

  client.user.setStatus(args[0]).then(() => {
    msg.edit('', {embed: {
        color: args[0] === 'online' ? 0x00FF00
        : (args[0] === 'idle' ? 0xFFA500
        : (args[0] === 'dnd' ? 0xBE1931
        : 0x696969)),
        description: `Status has been set to **${args[0]}**! :black_heart:`
      }
    }).then(message => message.delete(5000));
  })
  .catch(() => msg.edit('', { embed: error}).then(message => message.delete(10000)));
};
