module.exports = warn => {
  console.log(require('chalk').yellow(`Something went wrong! Received a warning from Discord!\n${warn}`));
};
