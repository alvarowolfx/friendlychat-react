import React, { Component } from 'react';

//import { Snackbar } from 'react-mdl';
import firebase from 'firebase';

import Navbar from './Navbar';
import MessagesCardContainer from './MessagesCardContainer';
import MessageList from './MessageList';
import MessageInputForm from './MessageInputForm';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

class App extends Component {
  authRef = null;
  messagesRef = null;

  state = {
    user: null,
    messages: {},
    form: {
      text: ''
    }
  };

  componentDidMount() {
    this.authRef = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.loadMessages();
    });
  }

  loadMessages() {
    let db = firebase.database();

    if (this.messagesRef) {
      this.messagesRef.off();
    }

    this.messagesRef = db.ref('/messages');

    this.messagesRef.limitToLast(50).on('value', snapshot => {
      let messages = snapshot.val();
      if (messages) {
        this.setState({
          messages
        });
      }
    });
  }

  componentWillUnmount() {
    this.authRef && this.authRef.off();
    this.messagesRef && this.messagesRef.off();
  }

  onSignInPress() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onSignOutPress() {
    firebase.auth().signOut();
  }

  checkUser() {
    if (!this.state.user) {
      alert('You must be logged in');
      return false;
    }
    return true;
  }

  onFileSelected(file) {
    if (!this.checkUser()) {
      return;
    }

    let { user } = this.state;

    this.messagesRef
      .push({
        name: user.displayName,
        imageUrl: LOADING_IMAGE_URL,
        photoUrl: user.photoURL
      })
      .then(message => {
        let storage = firebase.storage();
        let filePath = user.uid + '/' + message.key + '/' + file.name;
        return storage
          .ref(filePath)
          .put(file)
          .then(snapshot => {
            let imageUrl = snapshot.downloadURL;
            return message.update({ imageUrl });
          });
      });
  }

  sendMessage() {
    let { form, user } = this.state;
    if (!this.checkUser()) {
      return;
    }

    if (form.text) {
      this.messagesRef
        .push({
          name: user.displayName,
          text: form.text,
          photoUrl: user.photoURL
        })
        .then(() => {
          this.setState({
            form: {
              text: ''
            }
          });
        });
    }
  }

  render() {
    let { user, messages, form } = this.state;

    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Navbar
          user={user}
          onSignInPress={this.onSignInPress}
          onSignOutPress={this.onSignOutPress}
        />

        <main className="mdl-layout__content mdl-color--grey-100">
          <MessagesCardContainer>
            <MessageList messages={messages} />
            <MessageInputForm
              text={form.text}
              onTextChange={text => {
                this.setState({ form: { text } });
              }}
              onFileSelected={this.onFileSelected.bind(this)}
              onSend={() => this.sendMessage()}
            />
          </MessagesCardContainer>

          {/*<Snackbar active={} onTimeout={() => {}} />*/}
        </main>
      </div>
    );
  }
}

export default App;
