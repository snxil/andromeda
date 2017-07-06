const config = require('../config/config.json');
const embedColor = parseInt(config.embeds.defaultColor);

exports.run = async function(client, msg, args) {
  let messageCount = parseInt(args[0]) ?
  (parseInt(args[0]) < 50 ? parseInt(args[0]) : 10)
  : 10;

  let confirm = [
    'Can-do!',
    'No problemo!',
    'Done!',
    'Mission accomplished!',
    'Roger-that!',
    'Aye aye, Captain!'
  ];

  await msg.edit(`${confirm[~~(Math.random * confirm.length)]} Deleting ${messageCount} messages!`);

  msg.channel.fetchMessages({ limit: 100 })
  .then(messages => {
    let msgArray = messages.array();
    msgArray = msgArray.filter(m => m.author.id === client.user.id);
    msgArray.length = messageCount + 1;
    msgArray.map(m => m.delete().catch(console.error));
  });
};
