const config = require('../config/config.json'); // Require config file
const embedColor = parseInt(config.embeds.defaultColor);
const moment = require('moment'); // Require moment
const chalk = require('chalk'); // Require chalk
const prefix = config.commandPrefix; // Define command prefix
const tprefix = config.tagPrefix;  // Define tag prefix

const sql = require('sqlite'); // Require SQLite
sql.open('./util/database.sqlite'); // Open database file

module.exports = msg => {
  let client = msg.client; // Define the client
  // Safety checks
  if(msg.author !== client.user) return;
  if(!msg.content.startsWith(prefix) && !msg.content.startsWith(tprefix)) return;

  let args = msg.content.split(' '); // Define arguments

  if(msg.content.startsWith(prefix)) { // Regular commands
    let command = args.shift().slice(prefix.length); // Define commands

    try { // Run the command file
      command = command.replace('thetime', 'time'); // Time command alias
      command = command.replace('color', 'colour'); // Colour command alias

      let cmdFile = require(`../commands/${command}`);
      cmdFile.run(client, msg, args);
    }
    catch(e) { // If it can't find the command
      console.log(chalk.red(msg.guild ? `Unrecognised command (${command}) in ${msg.guild.name}, ${msg.guild.id}!`
      : `Unrecognised command (${command})!`));
      console.log(chalk.red('If you believe this shouldn\'t happen, please contact Cosmos#5921!'));
      console.log(e.stack);
    };

  } else { // Tags
    let tag = args.shift().slice(tprefix.length); // Define tags
    let tagContent = args.slice(1).join(' '); // Define tag content

    let error = { // Error embed
      title: ':x: Something went wrong~!',
      color: 0xBE1931,
      footer: { text: 'This will automatically clear in 10 seconds' }
    };

    if(tag === 'create') { // Create tag
      if(!args[0] || !tagContent) { // No tag name or content
        error.description = 'I can\'t create a tag without a name and content, silly!';
        msg.edit({ embed: error }).then(message => message.delete(10000));
      };

      sql.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
        if(row) { // Can find the row
          error.description = `The tag \`${args[0]}\` already exists, sorry!`;
          msg.edit({ embed: error }).then(message => message.delete(10000));
        } else { // Can't find the row
          sql.run('INSERT INTO tags (name, content, uses, created, edited) VALUES (?, ?, ?, ?, ?)',
          [args[0], tagContent, 0, msg.createdAt, msg.createdAt]);
          msg.edit('', {embed: {
              color: config.embeds.useRoleColor ?
              (msg.guild ? msg.guild.me.displayColor : embedColor)
              : embedColor,
              description: `:page_facing_up: Created the tag **${args[0]}** :black_heart:\n\`\`\`${tagContent}\`\`\``
            }
          }).then(message => message.delete(10000));
          console.log(`Created the tag '${args[0]}'!`);
        };
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    } else
    if(tag === 'delete') { // Delete tag
      if(!args[0]) { // No tag name
        error.description = 'I can\'t delete nothing, silly!';
        msg.edit({ embed: error }).then(message => message.delete(10000));
      }

      sql.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
        if(!row) { // Can't find the row
          error.description = `The tag \`${args[0]}\` doesn't exist, sorry!`;
          msg.edit({ embed: error }).then(message => message.delete(10000));
        } else { // Can find the row
          sql.run(`DELETE FROM tags WHERE name = '${args[0]}'`);
          msg.edit('', {embed: {
              color: config.embeds.useRoleColor ?
              (msg.guild ? msg.guild.me.displayColor : embedColor)
              : embedColor,
              description: `:page_facing_up: Deleted the tag **${args[0]}** :black_heart:`
            }
          }).then(message => message.delete(10000));
          console.log(`Deleted the tag '${args[0]}'!`);
        };
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    } else
    if(tag === 'update') { // Update tag
      if(!args[0] || !tagContent) { // No tag name or content
        error.description = 'I can\'t update a tag without a name and content, silly!'
        msg.edit({ embed: error }).then(message => message.delete(10000));
      };

      sql.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
        if(!row) { // Can't find the row
          error.description = `The tag \`${args[0]}\` doesn't exist, sorry!`;
          msg.edit({ embed: error }).then(message => message.delete(10000));
        } else { // Can find the row
          sql.run(`UPDATE tags SET content = "${tagContent}" WHERE name = '${args[0]}'`); // Update content
          sql.run(`UPDATE tags SET edited = '${msg.createdAt}' WHERE name = '${args[0]}'`); // Update edited time
          msg.edit('', {embed: {
              color: config.embeds.useRoleColor ?
              (msg.guild ? msg.guild.me.displayColor : embedColor)
              : embedColor,
              description: `:page_facing_up: Modified the tag **${args[0]}**! :black_heart:\n\`\`\`${tagContent}\`\`\``
            }
          }).then(message => message.delete(10000));
          console.log(`Updated the tag '${args[0]}'`);
        };
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    } else
    if(tag === 'info') { // Tag info
      if(!args[0]) { // No tag name
        error.description = 'You have to give me a tag, silly!';
        msg.edit({ embed: error }).then(message => message.delete(10000));
      };

      sql.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
        if(!row) { // Can't find the row
          error.description = `The tag \`${args[0]}\` doesn't exist, sorry!`;
          msg.edit({ embed: error }).then(message => message.delete(10000));
        } else { // Can find the row
          msg.edit('', {embed: {
              title: ':page_facing_up: Tag Information~',
              color: config.embeds.useRoleColor ?
              (msg.guild ? msg.guild.me.displayColor : embedColor)
              : embedColor,
              description: `**Tag:** ${args[0]}\n` +
              `**Uses:** ${row.uses}\n` +
              `**Content:** \n\`\`\`${row.content}\`\`\`\n` +
              `Tag was created **${moment(row.created).format('MMM Do YY, h:mm:ss A')}**~!\n` +
              `Tag was last edited **${moment(row.edited).format('MMM Do YY, h:mm:ss A')}**~!`,
              footer: { text: 'This will automatically clear in 30 seconds' }
            }
          }).then(message => message.delete(30000));
        };
      }).catch(e => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    } else
    if(tag === 'list') { // List tags
      sql.all('SELECT * FROM tags').then(collumn => {
        if(collumn.map(c => c.name).length < 1) return msg.edit('', {embed: {
            color: msg.guild ? msg.guild.me.displayColor : 0x966fd6,
            description: 'You currently don\'t have any tags!'
          }
        }).then(message => message.delete(10000));
        msg.edit('', {embed: {
            color: config.embeds.useRoleColor ?
            (msg.guild ? msg.guild.me.displayColor : embedColor)
            : embedColor,
            description: `**Your tags:**\n${collumn.map(c => c.name).join(', ')}`
          }
        });
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    } else { // Regular tags
      sql.get(`SELECT * FROM tags WHERE name = '${tag}'`).then(row => {
        if(!row) { // Can't find the row
          error.description = `I can't find the tag \`${tag}\`, sorry!`;
          console.log(chalk.red(`I couldn't find the tag '${tag}'!`));
          msg.edit({ embed: error }).then(message => message.delete(10000));
        } else {
          console.log(msg.guild ? `Tag '${tag}' was used in ${msg.guild.name}, ${msg.guild.id}!`
          : `Tag '${tag}' was used!`);
          msg.edit(row.content); // Edit message with tag content
          sql.run(`UPDATE tags SET uses = ${row.uses + 1} WHERE name = '${tag}'`); // Update uses
        };
      }).catch(() => {
        sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
        console.log(chalk.red('No tags database found! Creating...'));
      });
    };
  };
};
