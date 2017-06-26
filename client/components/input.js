const React = require('react')
const MessageStore = require('../message_store')

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', text: ''}
  }

  handleUsernameChange (e) {
    this.setState({ username: e.target.value })
  }

  handleTextChange (e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username, this.state.text)
    this.setState({ text: '' })
  }

  render () {
    return (
      <div id='input'>
        <form id='input-form' onSubmit={this.handleSubmit.bind(this)}>
          <p>
            <input placeholder='username' name='username' value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
          </p>
          <p>
            <textarea name='text' onChange={this.handleTextChange.bind(this)} value={this.state.text} />
          </p>
          <p>
            <input type='submit' value='Send' />
          </p>
        </form>
      </div>
    )
  }
}

module.exports = Input
