const React = require('react')
const UserList = require('./user_list')
const Messages = require('./messages')
const Input = require('./input')
const MessageStore = require('../message_store')

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: null }
  }

  changeUsername (username) {
    this.setState({ username: username })
  }

  onSubmit (username, text) {
    MessageStore.postMessage(username, text)
    this.changeUsername(username)
  }

  render () {
    return (
      <div>
        <UserList changeUsername={this.changeUsername.bind(this)} />
        <Messages username={this.state.username} />
        <Input onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

module.exports = Application
