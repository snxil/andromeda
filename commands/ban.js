const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  if(msg.channel.type === 'dm') return;

  let member = msg.mentions.members.first();
  let clear = parseInt(args[1]) ? parseInt(args[1]) : 0;
  let reason = parseInt(args[1]) ? args.slice(2).join(' ')
  : args.slice(1).join(' ');

  let error = { // Error embed
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    description: member ? 'You don\'t have sufficient permissions to use this command!'
    : 'You have to mention a member to ban!',
    footer: { text: 'This will automatically clear in 10 seconds' }
  };

  if(!member || !msg.member.hasPermission('BAN_MEMBERS')) return msg.edit('', { embed: error })
  .then(message => message.delete(10000));

  if(member.highestRole.comparePositionTo(msg.member.highestRole) > 0) {
    error.description = 'You can\'t ban this member, their highest role exceeds yours!';
    return msg.edit('', { embed: error }).then(message => message.delete(10000));
  };

  msg.guild.ban(member, { days: clear, reason: reason }).then(() => {
    console.log(`Banned ${member.user.tag} from ${msg.guild.name}, ID: ${msg.guild.id}!`)
    msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `Successfully banned **${member.user.tag}** from ${msg.guild.name}!`,
        fields: [{
          name: 'Reason:',
          value: '```' + reason + '```'
        },
        {
          name: 'Cleared:',
          value: `${clear} days of messages have been cleared!`
        }],
        footer: { text: `Member ID: ${member.user.id}` }
      }
    });
  }).catch(console.error);
};
