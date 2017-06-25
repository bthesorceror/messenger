const path = require('path')
const express = require('express')

let app = module.exports = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})
