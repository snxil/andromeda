const config = require('../config/config.json');
const responses = require('../assets/responses.json');
const moment = require('moment');
exports.run = function(client, msg, args) {
  if(!msg.guild) return;
  let error = {
    title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
    color: 0xBE1931,
    description: 'I couldn\'t find that message! Make sure your arguments are correct and try again!\n' +
    'To quote from another channel, specify a channel name!\n' +
    'To quote from another guild, specify a guild ID and a channel name!',
    footer: { text: 'This will automatically clear in 10 seconds!' }
  };

  if(args.length === 1) {
    msg.channel.fetchMessage(args[0]).then(m => {
      msg.edit({ embed: {
          author: {
            name: m.member.nickname ? `${m.member.nickname}#${m.author.discriminator}`
            : m.author.tag,
            icon_url: m.author.displayAvatarURL
          },
          color: m.member.displayColor,
          description: m.embeds[0] ? m.embeds[0].description : m.content,
          footer: {
            text: m.editedAt ? `Message was edited ${moment(m.editedAt).fromNow()}`
            : `Message was created ${moment(m.createdAt).fromNow()}`
          }
        }
      });
    }).catch(() => msg.edit({ embed: error }).then(m => m.delete(10000)));
  } else
  if(args.length == 2) {
    msg.guild.channels.find('name', args[0]).fetchMessage(args[1]).then(m => {
      msg.edit({ embed: {
          author: {
            name: m.member.nickname ? `${m.member.nickname}#${m.author.discriminator}`
            : m.author.tag,
            icon_url: m.author.displayAvatarURL
          },
          color: m.member.displayColor,
          description: m.embeds[0] ? m.embeds[0].description : m.content,
          footer: {
            text: m.editedAt ? `Message was edited ${moment(m.editedAt).fromNow()} in #${m.channel.name}`
            : `Message was created ${moment(m.createdAt).fromNow()} in #${m.channel.name}`
          }
        }
      });
    }).catch(() => msg.edit({ embed: error }).then(m => m.delete(10000)));
  } else
  if(args.length == 3) {
    client.guilds.get(args[0]).channels.find('name', args[1]).fetchMessage(args[2]).then(m => {
      msg.edit({ embed: {
          author: {
            name: m.member.nickname ? `${m.member.nickname}#${m.author.discriminator}`
            : m.author.tag,
            icon_url: m.author.displayAvatarURL
          },
          color: m.member.displayColor,
          description: m.embeds[0] ? m.embeds[0].description : m.content,
          footer: {
            text: m.editedAt ? `Message was edited ${moment(m.editedAt).fromNow()} in #${m.channel.name}, ${m.guild.name}`
            : `Message was created ${moment(m.createdAt).fromNow()} in #${m.channel.name}, ${m.guild.name}`
          }
        }
      });
    }).catch(() => msg.edit({ embed: error }).then(m => m.delete(10000)));
  };
};

/*
const moment = require('moment'); // Require moment
const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  let error = { // Error embed
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    description: args[1] ? 'I don\'t know what that channel is, sorry!'
    : (args[0] ? 'I don\'t know what that message is, sorry!\nSpecify a channel name to quote from another channel!'
    : 'I can\'t quote nothing!'),
    footer: { text: 'This will automatically clear in 10 seconds' }
  };

  if(!args[0]) return msg.edit({ embed: error }).then(message => message.delete(10000));

  if(!args[1]) { // Only one argument
    msg.channel.fetchMessage(args[0]).then(message => {
      msg.edit('', {embed: {
          author: { name: message.author.tag, icon_url: message.author.displayAvatarURL },
          color: msg.guild ? message.member.displayColor : embedColor,
          description: message.embeds[0] ? message.embeds[0].description : message.content,
          footer: { text: message.editedAt ? `Message was edited ${moment(message.editedAt).fromNow()}`
            : `Message was created ${moment(message.createdAt).fromNow()}` }
        }
      });
    }).catch(() => msg.edit({ embed: error }).then(message => message.delete(10000)));
  } else { // More than one argument
    if(msg.channel.type === 'dm') return;

    let quoteChannel = msg.guild.channels.find('name', args[0]);
    if(!quoteChannel) return msg.edit({ embed: error }).then(message => message.delete(10000));

    quoteChannel.fetchMessage(args[1]).then(message => {
      msg.edit('', {embed: {
          author: { name: message.author.tag, icon_url: message.author.displayAvatarURL },
          color: msg.guild ? message.member.displayColor : embedColor,
          description: message.embeds[0] ? message.embeds[0].description : message.content,
          footer: { text: message.editedAt ? `Message was edited ${moment(message.editedAt).fromNow()} in #${message.channel.name}`
            : `Message was created ${moment(message.createdAt).fromNow()} in #${message.channel.name}` }
        }
      });
    }).catch(() => msg.edit({ embed: error }).then(message => message.delete(10000)));
  }
};
*/
