import React, { Component } from 'react';

//import { Snackbar } from 'react-mdl';
import firebase from 'firebase';

import Navbar from './Navbar';
import MessagesCardContainer from './MessagesCardContainer';
import MessageList from './MessageList';
import MessageInputForm from './MessageInputForm';

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
    });

    let db = firebase.database();
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
    this.authRef && this.authRef();
    this.messagesRef && this.messagesRef();
  }

  onSignInPress() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onSignOutPress() {
    firebase.auth().signOut();
  }

  sendMessage() {
    let { form, user } = this.state;
    if (!user) {
      alert('You must be logged in');
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
              onFileSelected={file => {
                console.log('File selected');
              }}
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
