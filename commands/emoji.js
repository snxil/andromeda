const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
exports.run = function(client, msg, args) {
  if(!msg.guild) return;
  let error = { // Error embed
    title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
    color: 0xBE1931,
    footer: { text: 'This will automatically clear in 10 seconds' }
  };
  let embedColor = config.embeds.useRoleColor ?
  (msg.guild ? msg.guild.me.displayColor : dColor)
  : dColor;

  if(args[0] === 'create' || args[0] === 'add') { // Create emojis
    if(!msg.member.hasPermission('MANAGE_EMOJIS', { checkAdmin: true })) { // Insufficient perms
      error.description = `You don't have permissions to create emojis in ${msg.guild.name}, sorry!`;
      msg.edit({ embed: error }).then(m => m.delete(10000));
    } else
    if(!args[2]) { // Insufficient args
      error.description = 'I can\'t create an emoji without a name and image, sorry!'
      msg.edit({ embed: error }).then(m => m.delete(10000));
    } else {
      msg.guild.createEmoji(args[2], args[1])
      .then(emoji => {
        msg.edit({ embed: {
            author: { name: 'Guild Emoji Created!', icon_url: msg.author.displayAvatarURL },
            color: embedColor,
            description: `Created a new emoji \`:${emoji.name}:\` in ${emoji.guild.name}! :heart:`,
            thumbnail: { url: emoji.url }
          }
        });
      })
      .catch(e => {
        error.description = `I ran into an issue creating an emoji in ${msg.guild.name}, check the link and try again!`
        msg.edit({ embed: error }).then(m => m.delete(10000));
      });
    };
  } else
  if(args[0] === 'delete' || args[0] === 'remove') { // Delete emojis
    if(!msg.member.hasPermission('MANAGE_EMOJIS', { checkAdmin: true })) { // Insufficient perms
      error.description = `You don't have permissions to delete emojis in ${msg.guild.name}, sorry!`;
      msg.edit({ embed: error }).then(m => m.delete(10000));
    } else
    if(!args[1]) { // Insufficient args
      error.description = 'You have to give me an emoji for me to delete it, silly!'
      msg.edit({ embed: error }).then(m => m.delete(10000));
    } else {
      let dEmoji = msg.guild.emojis.find('name', args[1]);
      if(!dEmoji) {
        error.description = `Cannot find the emoji '${args[1]}', sorry!`;
        return msg.edit({ embed: error }).then(m => m.delete(10000));
      };
      msg.guild.deleteEmoji(dEmoji.id)
      .then(emoji => {
        msg.edit({ embed: {
            author: { name: 'Guild Emoji Deleted!', icon_url: msg.author.displayAvatarURL },
            color: embedColor,
            description: `Deleted a guild emoji \`:${args[1]}:\` in ${msg.guild.name}! :heart:`,
            thumbnail: { url: dEmoji.url }
          }
        });
      })
      .catch(e => {
        error.description = `I ran into an issue deleting an emoji in ${msg.guild.name}!`
        msg.edit({ embed: error }).then(m => m.delete(10000));
      });
    };
  } else
  if(args[0] === 'list') { // List emojis
    if(msg.guild.emojis.size > 0) return msg.edit({ embed: {
        color: embedColor,
        description: `**${responses.positive[~~(Math.random() * responses.positive.length)]}** ` +
        `**Here are the emojis in this guild:**\n${msg.guild.emojis.map(e => `\`:${e.name}:\``).join(', ')}`
      }
    });
    else return msg.edit({ embed: {
        color: embedColor,
        description: 'There are no custom emojis in this guild!'
      }
    });
  } else { // Unknown command
    error.description = 'I don\'t understand the command! Please use `create/add`, `delete/remove`, or `list`!\n'
  };
};
