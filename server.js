const _ = require('lodash')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('./passport')
const User = require('./app/models/user')

function requireUser (req, res, next) {
  if (!req.user) {
    return res.redirect('/')
  }

  next()
}

let app = express()

app.use('/public', express.static('public'))

let sessions = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
})

app.use(sessions)

app.use(bodyParser.urlencoded({ extended: false }))

passport(app)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/app', requireUser, (req, res) => {
  res.render('app')
})

app.get('/api/usernames', requireUser, (req, res) => {
  User.findAllUsernames().then((usernames) => {
    res.json({ usernames: usernames })
  }).catch(() => {
    res.status(500).json({ error: 'An error has occurred' })
  })
})

let server = http.Server(app)
let io = socketio(server)

io.use((socket, next) => {
  sessions(socket.request, socket.request.res, next)
})

io.use((socket, next) => {
  let id = _.get(socket.request.session, 'passport.user')

  if (!id) {
    return next()
  }

  User.findById(id).then(function (user) {
    socket.user = user
    next()
  }).catch(next)
})

io.on('connection', (socket) => {
  console.log('Connected')
  console.dir(socket.user)
})

module.exports = server
