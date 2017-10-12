import React, { Component } from 'react';

//import { Snackbar } from 'react-mdl';

import Navbar from './Navbar';
import MessagesCardContainer from './MessagesCardContainer';
import MessageList from './MessageList';
import MessageInputForm from './MessageInputForm';

class App extends Component {
  state = {
    user: {
      displayName: 'Alvaro Viebrantz',
      photoURL: 'https://avatars0.githubusercontent.com/u/1615543?v=4&s=460'
    },
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

  render() {
    let { user, messages, form } = this.state;

    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Navbar
          user={user}
          onSignInPress={() => {}}
          onSignOutPress={() => {}}
        />

        <main className="mdl-layout__content mdl-color--grey-100">
          <MessagesCardContainer>
            <MessageList messages={messages} />
            <MessageInputForm
              text={form.text}
              onTextChange={text => {}}
              onFileSelected={file => {}}
              onSend={() => {}}
            />
          </MessagesCardContainer>

          {/*<Snackbar active={} onTimeout={() => {}} />*/}
        </main>
      </div>
    );
  }
}

export default App;
