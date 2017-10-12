import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends Component {
  renderUserContainer() {
    let { user, onSignOutPress, onSignInPress } = this.props;
    if (user) {
      return (
        <div id="user-container">
          <div
            id="user-pic"
            style={{
              backgroundImage: user.photoURL && `url(${user.photoURL})`
            }}
          />
          <div id="user-name">{user.displayName}</div>
          <button
            id="sign-out"
            onClick={onSignOutPress}
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
          >
            Sign-out
          </button>
        </div>
      );
    }

    return (
      <div id="user-container">
        <button
          id="sign-in"
          onClick={onSignInPress}
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
        >
          <i className="material-icons">account_circle</i>Sign-in with Google
        </button>
      </div>
    );
  }
  render() {
    return (
      <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <h3>
              <i className="material-icons">chat_bubble_outline</i> Friendly
              Chat
            </h3>
          </div>
          {this.renderUserContainer()}
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string
  }),
  onSignInPress: PropTypes.func,
  onSignOutPress: PropTypes.func
};
