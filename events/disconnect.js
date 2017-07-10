module.exports = client => {
  console.log('Oh no! I\'ve been disconnected! x^x\n' +
  require('chalk').red(`Disconnected at ${require('moment')().format('MMMM Do YY, h:mm:ss A')}~!`));
};
