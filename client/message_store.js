const axios = require('axios')
const EventEmitter = require('events').EventEmitter

class MessageStore extends EventEmitter {
  constructor () {
    super()
    this.messages = {}
  }

  initialize () {
    axios.get('/api/messages').then((response) => {
      this.messages = response.data.messages
      this.emit('changed')
    }).catch((err) => {
      this.emit('error', err)
    })
  }
}

module.exports = new MessageStore()
