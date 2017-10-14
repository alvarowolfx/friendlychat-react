import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = ({
  message: { text, name, imageUrl, photoUrl, moderated, sentiment },
  onImageLoaded
}) => {
  let sentimentClass = {};

  if (sentiment) {
    sentimentClass = {
      bad: sentiment.score <= -0.25,
      good: sentiment.score >= 0.25
    };
  }

  return (
    <div className="message-container visible">
      <div className="spacing">
        <div
          className="pic"
          style={{
            backgroundImage: photoUrl && `url(${photoUrl})`
          }}
        />
      </div>
      <div className={classNames('message', sentimentClass)}>
        {imageUrl ? (
          <img
            src={`${imageUrl}${moderated ? '?moderated=1' : ''}`}
            alt="Attachment"
            onLoad={onImageLoaded}
          />
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
