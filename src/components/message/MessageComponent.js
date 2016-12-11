import React, { Component } from 'react';


class MessageComponent extends Component {

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