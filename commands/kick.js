const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = async function(client, msg, args, findMember) {
  if(!msg.guild) return;
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;
  let error = { // Error embed
    title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
    color: 0xBE1931,
    description: findMember(args[0]) ? 'You don\'t have sufficient permissions to use this command!'
    : 'You have to mention a member or specify an ID to kick!',
    footer: { text: 'This will automatically clear in 10 seconds!' }
  };
  let member = findMember(args[0]);
  let reason = args.slice(1).join(' ');

  if(!member || !msg.member.hasPermission('KICK_MEMBERS', { checkAdmin: true }))
    return msg.edit({ embed: error }).then(m => m.delete(10000));

  if(msg.member.highestRole.comparePositionTo(member.highestRole) < 1) {
    error.description = 'You can\'t kick this member, their highest role is equal to or exceeds yours!';
    return msg.edit({ embed: error }).then(m => m.delete(10000));
  };

  await msg.edit({ embed: {
      title: ':bangbang: Kicking Member! :bangbang:',
      color: embedColor,
      description: `You are about to kick **${member.user.tag}** from ${msg.guild.name}, are you sure about this?\n` +
      'To kick this member, please type **confirm**\n' +
      'To cancel this kick, please type **cancel**',
      fields:[{
        name: 'Reason:',
        value: reason ? reason : 'No reason specified!'
      }],
      thumbnail: { url: member.user.displayAvatarURL },
      footer: { text: 'Kick will be automatically cancelled in 20 seconds!' }
    }
  });
  const collector = msg.channel.createMessageCollector(
   m => m.author === msg.author && m.content.toLowerCase() === 'confirm' || m.content.toLowerCase() === 'cancel',
   { time: 20000, maxMatches: 1 }
  );
  collector.on('collect', m => {
    if(m.content === 'confirm') {
      member.kick(reason)
      .then(() => {
        msg.delete();
        m.edit({ embed: {
            author: { name: member.user.tag, icon_url: member.user.displayAvatarURL },
            color: embedColor,
            description: `${responses.positive[~~(Math.random() * responses.positive.length)]} Successfully kicked **${member.user.tag}** from ${msg.guild.name}! :boot:`,
            fields: [{
              name: 'Reason:',
              value: reason ? reason : 'No reason specified!'
            }],
            footer: { text: `Member was kicked ${require('moment')().format('dddd, MMM Do, h:mm:ss A')}`}
          }
        });
        console.log(`Kicked ${member.user.tag} from ${msg.guild.name}!`);
      }).catch(console.error);
    } else {
      msg.delete();
      m.edit({ embed: {
          author: { name: member.user.tag, icon_url: member.user.displayAvatarURL },
          color: embedColor,
          description: `The kick has been cancelled! (${member.user.tag} may live... for now) :heart:`
        }
      });
    };
  });
  collector.on('end', collected => {
    if(collected.size === 0) {
      msg.edit({ embed: {
          author: { name: member.user.tag, icon_url: member.user.displayAvatarURL },
          color: embedColor,
          description: `The kick has timed out! (${member.user.tag} gets to live another day...) :heart:`
        }
      });
    } else return;
  });
};
