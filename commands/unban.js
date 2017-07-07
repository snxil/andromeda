const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  if(msg.channel.type === 'dm') return;

  let member = args[0];
  let reason = args.slice(1).join(' ');

  let error = { // Error embed
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    description: member ? 'You don\'t have sufficient permissions to use this command!'
    : 'You have to mention a member to kick!',
    footer: { text: 'This will automatically clear in 10 seconds' }
  };

  if(!member || !msg.member.hasPermission('BAN_MEMBERS')) return msg.edit('', { embed: error })
  .then(message => message.delete(10000));

  msg.guild.unban(member).then(() => {
    console.log(`Unbanned ID ${member} from ${msg.guild.name}, ID: ${msg.guild.id}!`)
    msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `Successfully unbanned **ID ${member}** from ${msg.guild.name}!`
      }
    });
  }).catch(() => {
    error.description = 'I don\'t know who that is! Please check that it is a valid banned ID!';
    msg.edit('', { embed: error }).then(message => message.delete(10000));
  });
};
