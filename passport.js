const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./app/models/user')

module.exports = function (app) {
  passport.use(new LocalStrategy(function (username, password, done) {
    User.authenticate(username, password).then((user) => {
      done(null, user)
    }).catch((err) => {
      done(err)
    })
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  // Provider user to views
  app.use((req, res, next) => {
    res.locals.user = req.user
    next()
  })

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user)
    }).catch(done)
  })

  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/app'
    }))
}
