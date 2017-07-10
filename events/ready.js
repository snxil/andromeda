const config = require('../config/config.json');
const games = require('../config/games.json');
const responses = require('../assets/responses.json');

const sql = require('sqlite');
sql.open('./util/database.sqlite');
module.exports = async client => {
  await sql.all('SELECT * FROM tags').then(tags => {
    console.log(responses.greetings[~~(Math.random() * responses.greetings.length)] +
    ` ${tags.map(t => t.name).length} tags have been loaded!`);
  }).catch(() => {
    sql.run('CREATE TABLE IF NOT EXISTS tags (name TEXT, content TEXT, uses INTEGER, created DATE, edited DATE)');
    console.log(require('chalk').red('No tags database found! Creating...'));
  });

  if(['online', 'idle', 'dnd', 'invisible'].indexOf(config.defaultStatus.toLowerCase()) !== -1) {
    client.user.setStatus(config.defaultStatus.toLowerCase());
  } else {
    console.log(require('chalk').red('Default status must be either online, idle, dnd, or invisible!'));
  };

  console.log(`Logged in as ${client.user.tag} since ${require('moment')().format('MMM Do YY, h:mm:ss A')} with status ${client.user.settings.status}!`);

  if(!config.games.rotateGame) {
    if(config.defaultGameStreaming)
      client.user.setGame(config.defaultGame, 'https://www.twitch.tv/twitch');
    else client.user.setGame(config.defaultGame);

    console.log(`I've set your game to '${config.defaultGame}'${config.defaultGameStreaming ? ' with streaming enabled' : ''}!`);
  } else
  if(config.games.rotateGame && games.length > 0) {
    let game = games[~~(Math.random() * games.length)];
    if(config.games.streaming)
      client.user.setGame(game, 'https://www.twitch.tv/twitch');
    else client.user.setGame(game);

    console.log(`I've set your game to '${game}'${config.games.streaming ? ' with streaming enabled' : ''}!`);

    setInterval(() => {
      if(config.games.requireOnline && client.user.settings.status !== 'online') // Check if online and restrict is true
        console.log(`I didn't change the game, client is ${client.user.settings.status}`);
      else if(config.games.streaming)
        client.user.setGame(game, 'https://www.twitch.tv/twitch');
      else client.user.setGame(game);

      console.log(`I've set your game to '${game}'${config.games.streaming ? ' with streaming enabled' : ''}!`);
    });
  };
};
