const moment = require('moment'); // Require moment
const chalk = require('chalk'); // Require chalk

const config = require('../config/config.json');
const games = require('../config/games.json');

const sql = require('sqlite'); // Require SQLite
sql.open('./util/database.sqlite'); // Open database file

module.exports = async client => {
  await sql.all('SELECT * FROM tags').then(collumn => {
    console.log(`Hello there! ${collumn.map(c => c.name).length} tags have been loaded!`);
  }).catch(() => {
    sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
    console.log(chalk.red('No tags database found! Creating...'));
  });

  let defaultStatus = config.defaultStatus.toLowerCase();
  client.user.setStatus(defaultStatus)
  .catch(() => console.log(chalk.red(`Default status must be either 'online', 'idle', 'dnd', or 'invisible'!`)));

  console.log(`Logged in as ${client.user.tag} since ${moment().format('MMMM Do YY, h:mm:ss A')} with status ${client.user.settings.status}!`);

  if(!config.games.rotateGame) {
    if(config.defaultGameStreaming) {
      client.user.setGame(config.defaultGame, 'https://www.twitch.tv/twitch');
      console.log(`The game has been automatically set to '${config.defaultGame}' and streaming!`);
    } else {
      client.user.setGame(config.defaultGame);
      console.log(`The game has been automatically set to '${config.defaultGame}'!`);
    };
  };

  if(config.games.rotateGame && games.length > 0) {
    let game = games[~~(Math.random() * games.length)];
    config.games.streaming ? client.user.setGame(game, 'https://www.twitch.tv/twitch') : client.user.setGame(game);
    console.log(config.games.streaming ? `The game has been automatically set to '${game}' and streaming!`
    : `The game has been automatically set to '${game}'!`);
    setInterval(() => {
      if(config.games.requireOnline && client.user.presence.status !== 'online') { // Check if online if restrict is true
        console.log(`I didn't change the game, client is not online!`);
      } else {
        config.games.streaming ? client.user.setGame(game, 'https://www.twitch.tv/twitch') : client.user.setGame(game);
        console.log(config.games.streaming ? `The game has been automatically set to '${game}' and streaming!`
        : `The game has been automatically set to '${game}'!`);
      };
    }, config.games.rotateGameTime);
  };
};
