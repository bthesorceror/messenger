const MessageStore = require('./message_store')

MessageStore.on('changed', () => {
  console.dir(MessageStore.messages)
})

MessageStore.initialize()
