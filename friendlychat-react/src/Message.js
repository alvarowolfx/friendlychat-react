import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { text, name, imageUrl, photoUrl },
  onImageLoaded
}) => {
  return (
    <div className="message-container visible">
      <div className="spacing">
        <div
          className="pic"
          style={{ backgroundImage: photoUrl && `url(${photoUrl})` }}
        />
      </div>
      <div className="message">
        {imageUrl ? (
          <img src={imageUrl} alt="Attachment" onLoad={onImageLoaded} />
        ) : (
          text
        )}
      </div>
      <div className="name">{name}</div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    imageUrl: PropTypes.string,
    photoUrl: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired,
  onImageLoaded: PropTypes.func
};

export default Message;
