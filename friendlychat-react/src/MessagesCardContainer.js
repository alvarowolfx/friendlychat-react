import React from 'react';

const MessagesCardContainer = ({ children }) => {
  return (
    <div
      id="messages-card-container"
      className="mdl-cell mdl-cell--12-col mdl-grid"
    >
      <div
        id="messages-card"
        className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
      >
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessagesCardContainer;
