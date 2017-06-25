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

  describe('.create', () => {
    it('returns an error when there is no username', (done) => {
      User.create({}).catch((err) => {
        expect(err.message).toEqual('Username must be provided')
        done()
      })
    })

    it('returns an error when there is no username', (done) => {
      User.create({username: 'Henry'}).catch((err) => {
        expect(err.message).toEqual('Password must be provided')
        done()
      })
    })

    it('returns an error if user already exists', (done) => {
      User.create({username: 'bob', password: 'password'}).then(() => {
        return User.create({username: 'bob', password: 'password'})
      }).catch((err) => {
        expect(err.message).toEqual('User already exists')
        done()
      })
    })

    it('creates a new user', (done) => {
      User.create({username: 'bob', password: 'password'}).then(() => {
        return User.findByUsername('bob')
      }).then((user) => {
        expect(user.username).toEqual('bob')
        done()
      }).catch(done)
    })
  })
})
