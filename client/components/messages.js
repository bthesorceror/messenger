const React = require('react')
const MessageStore = require('../message_store')

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.username = props.username
    this.state = { messages: [] }
  }

  getMessages () {
    let messages = MessageStore.getMessages(this.username)
    this.setState({
      messages: messages
    })
  }

  componentDidMount () {
    this.bindEvents()
  }

  componentWillReceiveProps (nextProps) {
    this.username = nextProps.username
    this.getMessages()
  }

  componentWillUnmount () {
    this.unbindEvents()
  }

  onStoreChange () {
    this.getMessages()
  }

  bindEvents () {
    this.handler = this.onStoreChange.bind(this)
    MessageStore.on('changed', this.handler)
  }

  unbindEvents () {
    if (this.handler) {
      MessageStore.removeListener('changed', this.handler)
    }
  }

  get messages () {
    return this.state.messages.map((message, index) => {
      let key = `${this.username}-message-${index}`
      return (
        <li key={key}>{message.from} - {message.text}</li>
      )
    })
  }

  render () {
    return (
      <ul id='messages'>
        {this.messages}
      </ul>
    )
  }
}

module.exports = Messages
