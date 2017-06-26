const React = require('react')
const UserList = require('./user_list')

class Application extends React.Component {
  changeUsername (username) {
    console.log(username)
  }

  render () {
    return (
      <div>
        <UserList changeUsername={this.changeUsername.bind(this)} />
      </div>
    )
  }
}

module.exports = Application
