const bcrypt = require('bcrypt')
const database = require('./database')

class User {
  static findByUsername (username) {
    return database
      .select('*')
      .from('users')
      .where({ username: username })
      .first()
  }

  static findById (id) {
    return database
      .select('*')
      .from('users')
      .where({ id: id })
      .first()
  }

  static findAllUsernames () {
    return database
      .table('users')
      .pluck('username')
  }

  static async hashPassword (password) {
    return bcrypt.hash(password, 10)
  }

  static async authenticate (username, password) {
    let user = await this.findByUsername(username)

    if (!user) {
      return false
    }

    let result = await bcrypt.compare(password, user.password_hash)

    if (!result) {
      return false
    }

    return user
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

    let hash = await this.hashPassword(password)

    return database('users').insert({
      username: username,
      password_hash: hash
    })
  }
}

module.exports = User
