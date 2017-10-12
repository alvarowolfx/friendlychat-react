import React, { Component } from 'react';

//import { Snackbar } from 'react-mdl';
import firebase from 'firebase';

import Navbar from './Navbar';
import MessagesCardContainer from './MessagesCardContainer';
import MessageList from './MessageList';
import MessageInputForm from './MessageInputForm';

class App extends Component {
  authRef = null;

  state = {
    user: null,
    messages: {
      '-K2ib4H77rj0LYewF7dP': {
        text: 'Hello',
        name: 'anonymous'
      },
      '-K2ib5JHRbbL0NrztUfO': {
        text: 'How are you',
        name: 'anonymous'
      },
      '-K2ib62mjHh34CAUbide': {
        text: 'I am fine',
        name: 'anonymous'
      }
    },
    form: {
      text: ''
    }
  };

  componentDidMount() {
    this.authRef = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    this.authRef && this.authRef();
  }

  onSignInPress() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onSignOutPress() {
    firebase.auth().signOut();
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
              onSend={() => {
                console.log('Send');
              }}
            />
          </MessagesCardContainer>

          {/*<Snackbar active={} onTimeout={() => {}} />*/}
        </main>
      </div>
    );
  }
}

export default App;
