const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = async function(client, msg, args) {
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;

  let branch = 'master';
  if(args[0] === 'dev') branch = 'dev';

  await msg.edit(':computer: Opening command help...');
  require('opn')(`https://github.com/cosmoscodes/andromeda/blob/${branch}/COMMANDS.md`)
  .then(() => {
    console.log(`Opened andromeda ${branch} command help in browser!`);
    msg.edit({ embed: {
        color: embedColor,
        description: responses.positive[~~(Math.random() * responses.positive.length)] +
        ' I\'ve opened andromeda command help in your browser! :heart:',
        footer: { text: `Branch: ${branch}` }
      }
    }).then(m => m.delete(10000));
  }).catch(() => {
    console.log(`I couldn't open command help in your browser, sorry! (Branch: ${branch})`);
    msg.edit({ embed: {
        title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
        color: 0xBE1931,
        description: 'I had trouble opening command help in your browser, sorry!\n' +
        `https://github.com/cosmoscodes/andromeda/blob/${branch}/COMMANDS.md`,
        footer: { text: 'This will automatically clear in 10 seconds' }
      }
    }).then(m => m.delete(10000));
  });
};
