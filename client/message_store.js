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

  getMessages (username) {
    if (!username) {
      return []
    }

    return this.messages[username] || []
  }

  attachEvents () {
    this.client = require('socket.io-client')()

    this.client.on('message', (message) => {
      if (!this.messages[message.key]) {
        this.messages[message.key] = []
      }

      this.messages[message.key].push(message)

      this.emit('changed')
    })
  }

  postMessage (to, text) {
    if (!this.messages[to]) {
      this.messages[to] = []
      this.emit('changed')
    }

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
