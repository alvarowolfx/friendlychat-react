import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div id="messages">
      {Object.keys(messages).map(key => (
        <Message key={key} message={messages[key]} />
      ))}
      <span id="message-filler" />
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.objectOf(Message.propTypes.message)
};

export default MessageList;
