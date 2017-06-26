const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('./passport')

let app = express()

app.use('/public', express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
}))

app.use(bodyParser.urlencoded({ extended: false }))

passport(app)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/app', (req, res) => {
  res.render('app')
})

let server = http.Server(app)
let io = socketio(server)

io.on('connection', (socket) => {
  console.log('Connected')
})

module.exports = server
