const bcrypt = require('bcrypt')
const database = require('./database')

const saltRounds = 10

class User {
  static findByUsername (username) {
    return database
      .select('*')
      .from('users')
      .where({username: username})
      .first()
  }

  static async create (attributes) {
    let username = attributes.username
    let password = attributes.password

    if (!username) {
      throw new Error('Username must be provided')
    }

    if (!password) {
      throw new Error('Password must be provided')
    }

    let user = await this.findByUsername(username)

    if (user) {
      throw new Error('User already exists')
    }

    let hash = await bcrypt.hash(password, saltRounds)

    return database('users').insert({
      username: username,
      password_hash: hash
    })
  }
}

module.exports = User
