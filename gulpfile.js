const gulp = require('gulp')
const User = require('./app/models/user')
const database = require('./app/models/database')

gulp.task('users:import', (done) => {
  database('users').truncate().then(() => {
    return User.create({username: 'user1', password: 'password'})
  }).then(() => {
    return User.create({username: 'user2', password: 'password'})
  }).then(() => {
    console.info('Users imported!')
    process.exit(0)
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
})
