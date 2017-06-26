const EventEmitter = require('events').EventEmitter

class Dispatcher {
  constructor () {
    this.channels = {}
  }

  async dispatch (from, to, text) {
    let payload1 = {
      from: from.username,
      from_id: from.id,
      to: to.username,
      to_id: to.id,
      text: text,
      key: from.username
    }

    let payload2 = {
      from: from.username,
      from_id: from.id,
      to: to.username,
      to_id: to.id,
      text: text,
      key: to.username
    }

    ;(this.channels[to.id] || []).forEach((channel) => {
      channel.emit('message', payload1)
    })

    ;(this.channels[from.id] || []).forEach((channel) => {
      channel.emit('message', payload2)
    })
  }

  createChannel (userId) {
    if (!this.channels[userId]) {
      this.channels[userId] = []
    }

    let channel = new EventEmitter()

    this.channels[userId].push(channel)

    channel.destroy = () => {
      let index = this.channels[userId].indexOf(channel)
      if (index >= 0) {
        delete this.channels[userId][index]
      }
    }

    return channel
  }
}

module.exports = new Dispatcher()
