const React = require('react')
const UserList = require('./user_list')
const Messages = require('./messages')

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: null }
  }

  changeUsername (username) {
    this.setState({ username: username })
  }

  render () {
    return (
      <div>
        <UserList changeUsername={this.changeUsername.bind(this)} />
        <Messages username={this.state.username} />
      </div>
    )
  }
}

module.exports = Application
