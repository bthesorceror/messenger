const _ = require('lodash')
const database = require('./database')

class Message {
  static findAllByUser (user) {
    return database
      .select(
        'messages.*',
        'f.username AS from',
        't.username AS to'
      )
      .innerJoin('users AS f', 'f.id', 'messages.from_id')
      .innerJoin('users AS t', 't.id', 'messages.to_id')
      .from('messages')
      .where({ to_id: user.id })
      .orWhere({ from_id: user.id })
      .orderBy('messages.created_at')
  }

  static create (attributes) {
    let sanitized = _.pick(attributes, ['from_id', 'to_id', 'text'])

    return database('messages').insert(sanitized)
  }
}

module.exports = Message
