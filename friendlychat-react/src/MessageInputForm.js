import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessageInputForm extends Component {
  mediaCapture = null;
  imageForm = null;

  onSubmitImageClick = e => {
    e.preventDefault();
    this.mediaCapture.click();
  };

  onFileSelected = e => {
    e.preventDefault();
    let file = e.target.files[0];

    this.imageForm.reset();

    let { onFileSelected } = this.props;

    onFileSelected && onFileSelected(file);
  };

  onMessageSubmit = e => {
    e.preventDefault();

    let { onSend } = this.props;
    this.isSendEnabled() && onSend();
  };

  isSendEnabled() {
    return !!this.props.text;
  }

  render() {
    let { text, onTextChange } = this.props;
    return (
      <div>
        <form id="message-form" onSubmit={this.onMessageSubmit}>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="message"
              value={text}
              onChange={e => onTextChange(e.target.value)}
            />
            <label className="mdl-textfield__label" htmlFor="message">
              Message...
            </label>
          </div>
          <button
            id="submit"
            disabled={!this.isSendEnabled()}
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          >
            Send
          </button>
        </form>
        <form id="image-form" ref={imageForm => (this.imageForm = imageForm)}>
          <input
            id="mediaCapture"
            ref={mediaCapture => (this.mediaCapture = mediaCapture)}
            type="file"
            onChange={this.onFileSelected}
            accept="image/*,capture=camera"
          />
          <button
            id="submitImage"
            title="Add an image"
            onClick={this.onSubmitImageClick}
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
