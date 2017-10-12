import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessageInputForm extends Component {
  mediaCapture = null;

  render() {
    let { text, onFileSelected, onSend, onTextChange } = this.props;
    return (
      <div>
        <form id="message-form" action="#">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="message" />
            <label className="mdl-textfield__label" htmlFor="message">
              Message...
            </label>
          </div>
          <button
            id="submit"
            disabled={disableSend}
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          >
            Send
          </button>
        </form>
        <form id="image-form" action="#">
          <input
            id="mediaCapture"
            ref={mediaCapture => (this.mediaCapture = mediaCapture)}
            type="file"
            accept="image/*,capture=camera"
          />
          <button
            id="submitImage"
            title="Add an image"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
          >
            <i className="material-icons">image</i>
          </button>
        </form>
      </div>
    );
  }
}

MessageInputForm.propTypes = {
  text: PropTypes.string,
  onTextChange: PropTypes.func.isRequired,
  onFileSelected: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired
};
