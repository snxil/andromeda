const Discord = require('discord.js'); // Require Discord.js
const client = new Discord.Client(); // Define the Client
const fs = require('fs');

if(fs.existsSync('./config/config.json')) {
  const config = require('./config/config.json');
  require('./util/eventLoader')(client);
  client.login(config.token);
} else {
  fs.rename('./config/defaultconfig.json', './config/config.json');
  console.log('\'defaultconfig.json\' has been renamed to \'config.json\'!\n' +
  'If you haven\'t already, feel free to configure the config file to your liking!');
};
