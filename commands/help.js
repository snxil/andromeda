const opn = require('opn');
const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = async function(client, msg, args) {
  let branch = 'master';
  if(args[0] === 'dev') {
    branch = 'dev';
  };

  await msg.edit('Opening command help...');
  opn(`https://github.com/cosmoscodes/andromeda/blob/${branch}/COMMANDS.md`)
  .then(() => {
    console.log(`Opened andromeda ${branch} command help in browser!`);
    msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: 'I\'ve opened andromeda command help in your browser! :black_heart:',
        footer: { text: `Branch: ${branch}` }
      }
    }).then(message => message.delete(10000));
  }).catch(() => {
      console.log(`I couldn't open andromeda command help in your browser! (Branch: ${branch})`);
      msg.edit('', {embed: {
          title: ':x: Something went wrong~!',
          color: 0xBE1931,
          description: 'I couldn\'t open command help in your browser, sorry!\n' +
          `https://github.com/cosmoscodes/andromeda/blob/${branch}/COMMANDS.md`,
          footer: { text: 'This will automatically clear in 10 seconds' }
        }
      }).then(message => message.delete(10000));
  });
};
