const _ = require('lodash')
const axios = require('axios')
const EventEmitter = require('events').EventEmitter

class MessageStore extends EventEmitter {
  constructor () {
    super()
    this.messages = {}
  }

  getUserNames () {
    return _.keys(this.messages)
  }

  attachEvents () {
    this.client = require('socket.io-client')()

    this.client.on('message', (message) => {
      if (!this.messages[message.from]) {
        this.messages[message.from] = []
      }

      this.messages[message.from].push(message)

      this.emit('changed')
    })
  }

  postMessage (to, text) {
    axios.post('/api/messages', {
      to: to,
      text: text
    }, {
      withCredentials: true
    }).then(() => {
      console.log('Message Sent')
    })
  }

  initialize () {
    axios.get('/api/messages').then((response) => {
      this.messages = response.data.messages
      this.emit('changed')
      this.attachEvents()
    }).catch((err) => {
      this.emit('error', err)
    })
  }
}

module.exports = new MessageStore()
