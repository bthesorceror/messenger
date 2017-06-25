/* eslint-env mocha */

const expect = require('expect')
const User = require('../../app/models/user')
const database = require('../../app/models/database')

function cleanDatabase () {
  return database('users').truncate()
}

describe('User', () => {
  beforeEach(() => {
    return cleanDatabase()
  })

  describe('.findById', () => {
    it('returns user by id', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.findByUsername('user')
      }).then((user) => {
        return User.findById(user.id)
      }).then((user) => {
        expect(user.username).toEqual('user')
        done()
      }).catch(done)
    })
  })

  describe('.authenticate', () => {
    it('returns user with username and password match', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.authenticate('user', 'password')
      }).then((user) => {
        expect(user.username).toEqual('user')
        done()
      })
    })

    it('returns false with username and password do not match', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.authenticate('user', 'password1')
      }).then((user) => {
        expect(user).toEqual(false)
        done()
      })
    })

    it('returns false with user does not exist', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.authenticate('user1', 'password')
      }).then((user) => {
        expect(user).toEqual(false)
        done()
      })
    })
  })

  describe('.create', () => {
    it('returns an error when there is no username', (done) => {
      User.create({}).catch((err) => {
        expect(err.message).toEqual('Username must be provided')
        done()
      })
    })

    it('returns an error when there is no username', (done) => {
      User.create({username: 'user'}).catch((err) => {
        expect(err.message).toEqual('Password must be provided')
        done()
      })
    })

    it('returns an error if user already exists', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.create({username: 'user', password: 'password'})
      }).catch((err) => {
        expect(err.message).toEqual('User already exists')
        done()
      })
    })

    it('creates a new user', (done) => {
      User.create({username: 'user', password: 'password'}).then(() => {
        return User.findByUsername('user')
      }).then((user) => {
        expect(user.username).toEqual('user')
        done()
      }).catch(done)
    })
  })
})
