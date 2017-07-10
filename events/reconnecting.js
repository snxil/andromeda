module.exports = client => {
  console.log('Don\'t worry, I\'m reconnecting!\n' +
  require('chalk').yellow(`Reconnecting at ${require('moment')().format('MMMM Do YY, h:mm:ss A')}~!`));
};
