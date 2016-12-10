import React, { Component } from 'react';


class MessageComponent extends Component {

  render() {
    return (
      <div>
        <div id="uploadMessage">{ this.props.message }</div>
      </div>
    );
  }
}
export default MessageComponent;