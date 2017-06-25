const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('./passport')

let app = module.exports = express()

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
