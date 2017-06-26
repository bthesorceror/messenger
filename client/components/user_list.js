const React = require('react')
const MessageStore = require('../message_store')

class UserList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { usernames: [] }
  }

  componentDidMount () {
    this.bindEvents()
  }

  componentWillUnmount () {
    this.unbindEvents()
  }

  onStoreChange () {
    this.setState({ usernames: MessageStore.getUserNames() })
  }

  unbindEvents () {
    if (this.handler) {
      MessageStore.removeListener('changed', this.handler)
    }
  }

  bindEvents () {
    this.handler = this.onStoreChange.bind(this)
    MessageStore.on('changed', this.handler)
  }

  handleClick (e) {
    e.preventDefault()
    let username = e.target.dataset.username
    this.props.changeUsername(username)
  }

  get users () {
    return this.state.usernames.map((username) => {
      return (<li key={username}>
        <a href='#' data-username={username}
          onClick={this.handleClick.bind(this)}>{username}</a>
      </li>)
    })
  }

  render () {
    return (
      <ul id='user-list'>
        {this.users}
      </ul>
    )
  }
}

module.exports = UserList
