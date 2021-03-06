import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

class MessageList extends Component {
  messagesContainer = null;

  componentWillReceiveProps(nextProps) {
    let currentSize = Object.keys(this.props.messages).length;
    let newSize = Object.keys(nextProps.messages).length;
    if (currentSize !== newSize) {
      this.resize();
    }
  }

  resize() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 100);
  }

  onImageLoaded() {
    this.resize();
  }

  render() {
    let { messages } = this.props;
    return (
      <div
        id="messages"
        ref={messagesContainer => (this.messagesContainer = messagesContainer)}
      >
        {Object.keys(messages).map(key => (
          <Message
            key={key}
            message={messages[key]}
            onImageLoaded={this.onImageLoaded.bind(this)}
          />
        ))}
        <span id="message-filler" />
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.objectOf(Message.propTypes.message)
};

export default MessageList;
