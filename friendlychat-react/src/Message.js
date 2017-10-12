import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message: { text, name, picUrl, photoUrl } }) => {
  return (
    <div className="message-container visible">
      <div className="spacing">
        <div
          className="pic"
          style={{ backgroundImage: photoUrl && `url(${photoUrl})` }}
        />
      </div>
      <div className="message">{text}</div>
      <div className="name">{name}</div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    picUrl: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default Message;
