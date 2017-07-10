const config = require('../config/config.json');
const dColor = parseInt(config.embeds.defaultColor.replace('#', '0x'));
const responses = require('../assets/responses.json');
const moment = require('moment');
const prefix = config.commandPrefix;
const tprefix = config.tagPrefix;

const sql = require('sqlite');
sql.open('./util/database.sqlite');

module.exports = msg => {
  const client = msg.client;
  // Safety checks
  if(msg.author !== client.user) return;
  if(!msg.content.startsWith(prefix) && !msg.content.startsWith(tprefix)) return;

  const args = msg.content.split(' ');

  if(msg.content.startsWith(prefix)) { // Commands
    let command = args.shift().slice(prefix.length);
    command = command.replace('thetime', 'time');
    command = command.replace('color', 'colour');
    command = command.replace('setgame', 'playing');
    command = command.replace('setstreaming', 'streaming');
    command = command.replace('setstatus', 'status');
    command = command.replace('emojis', 'emoji');

    const findMember = text => {
      if(/^\d+$/.test(text)) return msg.guild.members.get(text);
      else if(msg.mentions.members.size > 0) return msg.mentions.members.first();
      else return false;
    };

    try {
      let cmdFile = require(`../commands/${command}`);
      cmdFile.run(client, msg, args, findMember);
    }
    catch(e) {
      console.log(require('chalk').red(`Unrecognised command! (${command})\n` +
      'If you believe this shouldn\'t happen, please contact Cosmos#5921!'));
      console.log(e.stack);
    };
  } else { // Tags
    const tag = args.shift().slice(tprefix.length);
    let tagContent = args.slice(1).join(' ');

    let error = { // Error embed
      title: `:x: ${responses.negative[~~(Math.random() * responses.negative.length)]}`,
      color: 0xBE1931,
      footer: { text: 'This will automatically clear in 10 seconds!' }
    };
    let embedColor = config.embeds.useRoleColor ?
    (msg.guild ? msg.guild.me.displayColor : dColor)
    : dColor;

    if(['create', 'delete', 'update', 'info'].indexOf(tag) !== -1) { // Tag cmds
      let tagName = '';
      if(args[0]) tagName = args[0].toLowerCase();

      sql.get(`SELECT * FROM tags WHERE name = '${tagName}'`).then(row => {
        if(tag === 'create') {
          if(!tagContent) { // Insufficient arguments
            error.description = 'I can\'t create a tag without a name and content, silly!';
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else
          if(row) { // Tag exists
            error.description = `The tag **${tagName}** already exists, sorry!`;
            msg.edit({ embed: error}).then(m => m.delete(10000));
          } else { // Tag does not exist
            sql.run('INSERT INTO tags (name, content, uses, created, edited) VALUES (?, ?, ?, ?, ?)',
            [tagName, tagContent, 0, msg.createdAt, msg.createdAt]); // Create tag
            msg.edit({ embed: {
                color: embedColor,
                description: `:page_facing_up: Successfully created the tag **${tagName}**! :heart:\n` +
                '```' + tagContent + '```',
                footer: { text: `Tag was created ${moment().format('dddd, MMM Do, h:mm:ss A')}`}
              }
            }).then(m => m.delete(15000));
            console.log(`Created the tag '${tagName}'!`);
          };
        } else
        if(tag === 'delete') {
          if(!tagName) { // Insufficient arguments
            error.description = 'You need to specify a tag to delete, silly!';
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else
          if(!row) { // Tag does not exist
            error.description = `The tag **${tagName}** doesn't exist, sorry!`;
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else { // Tag exists
            sql.run(`DELETE FROM tags WHERE name = '${tagName}'`);
            msg.edit({ embed: {
                color: embedColor,
                description: `:page_facing_up: Successfully deleted the tag **${tagName}**! :heart:`,
                footer: { text: `Tag was deleted ${moment().format('dddd, MMM Do, h:mm:ss A')}`}
              }
            }).then(m => m.delete(15000));
            console.log(`Deleted the tag '${tagName}'!`);
          };
        } else
        if(tag === 'update') {
          if(!tagContent) { // Insufficient arguments
            error.description = 'I can\'t update a tag without a name and content, silly!';
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else
          if(!row) { // Tag does not exist
            error.description = `The tag **${tagName}** doesn't exist, sorry!`;
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else { // Tag exists
            sql.run(`UPDATE tags SET content = "${tagContent}" WHERE name = '${tagName}'`); // Update content
            sql.run(`UPDATE tags SET edited = '${msg.createdAt}' WHERE name = '${tagName}'`); // Update edited time
            msg.edit({ embed: {
                color: embedColor,
                description: `:page_facing_up: Successfully updated the tag **${tagName}**! :heart:\n` +
                '```' + tagContent + '```',
                footer: { text: `Tag was updated ${moment().format('dddd, MMM Do, h:mm:ss A')}` }
              }
            }).then(m => m.delete(15000));
            console.log(`Updated the tag '${tagName}'!`);
          };
        } else { // Tag info
          if(!tagName) { // Insufficient arguments
            error.description = 'I can\'t get tag info if you don\'t give me a tag, silly!';
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else
          if(!row) { // Tag does not exist
            error.description = `The tag **${tagName}** doesn't exist, sorry!`;
            msg.edit({ embed: error }).then(m => m.delete(10000));
          } else {
            msg.edit({ embed: {
                title: ':page_facing_up: Tag Information! :heart:',
                color: embedColor,
                description: `**Name:** ${tagName}\n` +
                `**Uses:** ${row.uses}\n` +
                '**Content:**```' + row.content + '```\n' +
                `Tag was created ${moment(row.created).format('dddd, MMM Do, YYYY [at] h:mm:ss A')}~!\n` +
                `Tag was last edited ${moment(row.edited).format('dddd, MMM Do, YYYY [at] h:mm:ss A')}~!`,
                footer: { text: 'This will automatically clear in 20 seconds!' }
              }
            }).then(m => m.delete(20000));
          };
        };
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(require('chalk').red('No tags database found! Creating...'));
      });
    } else
    if(tag === 'list') { // List tags
      sql.all('SELECT * FROM tags').then(tags => {
        if(tags.map(t => t.name).length < 1) return msg.edit({ embed: {
            color: embedColor,
            description: 'You currently don\'t have any tags!',
            footer: { text: 'This will automatically clear in 10 seconds!' }
          }
        }).then(m => m.delete(10000));
        msg.edit({ embed: {
            color: embedColor,
            description: `**${responses.positive[~~(Math.random() * responses.positive.length)]}** ` +
            `**Here are your tags:**\n${tags.map(t => t.name).join(', ')}`
          }
        });
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(require('chalk').red('No tags database found! Creating...'));
      });
    } else { // Regular tags
      sql.get(`SELECT * FROM tags WHERE name = '${tag}'`).then(row => {
        if(!row) { // Tag does not exist
          error.description = `The tag **${tag}** doesn't exist, sorry!`;
          msg.edit({ embed: error }).then(m => m.delete(10000));
        } else {
          tagContent = row.content;
          tagContent = tagContent.replace('$MESSAGE$', args.join(' '));

          msg.edit(tagContent);
          sql.run(`UPDATE tags SET uses = ${row.uses + 1} WHERE name = '${tag}'`);
        }
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(require('chalk').red('No tags database found! Creating...'));
      });
    };
  };
};
