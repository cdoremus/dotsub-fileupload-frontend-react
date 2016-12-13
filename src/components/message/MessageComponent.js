import React, { Component } from 'react';


class MessageComponent extends Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    let message = this.props.message;
    let messageDiv = '';
    if (message) {
      messageDiv =
        <div id="uploadMessage">{ message }</div>
    }
    return (
      <div>
        { messageDiv }
      </div>
    );
  }
}
export default MessageComponent;