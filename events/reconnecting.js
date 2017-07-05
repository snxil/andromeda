const moment = require('moment'); // Require moment
const chalk = require('chalk'); // Require chalk

module.exports = client => {
  console.log('Don\'t worry, I\'m reconnecting!\n' +
  chalk.yellow(`Reconnecting at ${moment().format('MMMM Do YY, h:mm:ss A')}~!`));
};
