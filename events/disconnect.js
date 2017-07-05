const moment = require('moment'); // Require moment
const chalk = require('chalk'); // Require chalk

module.exports = client => {
  console.log('Oh no! I\'ve been disconnected! x^x\n' +
  chalk.red(`Disconnected at ${moment().format('MMMM Do YY, h:mm:ss A')}~!`));
};
