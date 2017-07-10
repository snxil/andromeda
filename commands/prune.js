const config = require('../config/config.json');
const responses = require('../assets/responses.json');
exports.run = async function(client, msg, args) {
  let messageCount = parseInt(args[0]) ?
  (parseInt(args[0]) < 50 ? parseInt(args[0]) : 10)
  : 10;

  await msg.edit(`${responses.positive[~~(Math.random() * responses.positive.length)]} Deleting ${messageCount} messages! :thumbsup:`);

  msg.channel.fetchMessages({ limit: 100 })
  .then(messages => {
    let msgArray = messages.array();
    msgArray = msgArray.filter(m => m.author.id === client.user.id);
    msgArray.length = messageCount + 1;
    msgArray.map(m => m.delete().catch(console.error));
  });
};
