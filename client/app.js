const MessageStore = require('./message_store')
const React = require('react')
const ReactDOM = require('react-dom')
const Application = require('./components/application')
const domready = require('domready')

domready(() => {
  ReactDOM.render(
      (<Application />),
      document.querySelector('#content')
  )

  MessageStore.on('changed', () => {
    console.dir(MessageStore.messages)
  })

  MessageStore.initialize()
})
