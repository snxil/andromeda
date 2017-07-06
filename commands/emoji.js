const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = function(client, msg, args) {
  let error = { // Error embed
    title: ':x: Something went wrong~!',
    color: 0xBE1931,
    footer: { text: 'This will automatically clear in 10 seconds' }
  };

  if(args[0] === 'create' || args[0] === 'add') { // Create emojis
    if(!msg.member.hasPermission('MANAGE_EMOJIS') && !msg.member.hasPermission('ADMINISTRATOR')) { // Insufficient permissions
      error.description = `Sorry, you don't have permissions to create emojis in ${msg.guild.name}!`;
      msg.edit({ embed: error }).then(message => message.delete(10000));
    } else
    if(!args[2]) { // Insufficient arguments
      error.description = 'I can\'t create an emoji without a name and image, sorry!\n' +
      '`Usage: guildemoji create/delete <name/id> <link>`';
      msg.edit('', { embed: error }).then(message => message.delete(10000));
    } else {
      msg.guild.createEmoji(args[2], args[1])
      .then(emoji => {
        console.log(`Created guild emoji '${emoji.name}' in ${emoji.guild.name}, ID: ${emoji.guild.id}`);
        msg.edit('', {embed: {
            author: {
              name: 'Guild Emoji Created!',
              icon_url: client.user.displayAvatarURL
            },
            color: config.embeds.useRoleColor ?
            (msg.guild ? msg.guild.me.displayColor : embedColor)
            : embedColor,
            description: `Created new guild emoji '${emoji.name}' in ${emoji.guild.name}! :black_heart:`,
            thumbnail: { url: emoji.url }
          }
        });
      })
      .catch(e => {
        error.description = `I ran into an issue creating an emoji in ${msg.guild.name}, check the link and try again!`
        msg.edit('', { embed: error }).then(message => message.delete(10000));
      });
    };
  } else
  if(args[0] === 'delete' || args[0] === 'remove') { // Delete emojis
    if(!msg.member.hasPermission('MANAGE_EMOJIS') && !msg.member.hasPermission('ADMINISTRATOR')) { // Insufficient permissions
      error.description = `Sorry, you don't have permissions to delete emojis in ${msg.guild.name}!`;
      msg.edit({ embed: error }).then(message => message.delete(10000));
    } else
    if(!args[1]) { // Insufficient arguments
      error.description = 'I can\'t delete an emoji without a name, sorry!'
      msg.edit('', { embed: error }).then(message => message.delete(10000));
    } else {
      let dEmoji = msg.guild.emojis.find('name', args[1]).id;
      if(!dEmoji) {
        error.description = `Cannot find the emoji '${args[1]}', sorry!`;
        return msg.edit('', { embed: error }).then(message => message.delete(10000));
      };
      let emojiUrl = msg.guild.emojis.find('name', args[1]).url;
      console.log(emojiUrl);
      msg.guild.deleteEmoji(dEmoji)
      .then(() => {
        console.log(`Delete guild emoji '${args[1]}' in ${msg.guild.name}, ID: ${msg.guild.id}`);
        msg.edit('', {embed: {
            author: {
              name: 'Guild Emoji Deleted!',
              icon_url: client.user.displayAvatarURL
            },
            color: config.embeds.useRoleColor ?
            (msg.guild ? msg.guild.me.displayColor : embedColor)
            : embedColor,
            description: `Deleted guild emoji '${args[1]}' in ${msg.guild.name}! :black_heart:`,
            thumbnail: { url: emojiUrl }
          }
        });
      })
      .catch(e => {
        error.description = `I ran into an issue deleting an emoji in ${msg.guild.name}!`
        msg.edit('', { embed: error }).then(message => message.delete(10000));
      });
    };
  } else
  if(args[0] === 'list') { // List custom guild emojis
    if(msg.channel.guild.emojis.size > 0) {
      msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `**Custom guild emojis:**\n${msg.channel.guild.emojis.map(e => `\`:${e.name}:\``).join(', ')}`
        }
      });
    } else return msg.edit('', {embed: {
        color: config.embeds.useRoleColor ?
        (msg.guild ? msg.guild.me.displayColor : embedColor)
        : embedColor,
        description: `There are no custom emojis in this guild!`
      }
    });
  } else { // No create/delete
    error.description = 'I don\'t understand the command! Please use the correct format!\n' +
    '`Usage: guildemoji create/delete <name/id> <link>`';
    msg.edit({ embed: error }).then(message => message.delete(10000));
  };
};
