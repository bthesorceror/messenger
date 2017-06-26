const EventEmitter = require('events').EventEmitter

class Dispatcher {
  constructor () {
    this.channels = {}
  }

  async dispatch (from, to, text) {
    let payload = {
      from: from.username,
      from_id: from.id,
      to: to.username,
      to_id: to.id,
      text: text
    }

    ;(this.channels[to.id] || []).forEach((channel) => {
      channel.emit('message', payload)
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
