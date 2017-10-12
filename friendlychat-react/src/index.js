import React from 'react';
import ReactDOM from 'react-dom';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import './styles/main.css';
import firebase from 'firebase';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: 'AIzaSyDBcnD4ho8FnUxNdZnPxgp02JRIsHRkgIw',
  authDomain: 'friendlychat-react-f2b83.firebaseapp.com',
  databaseURL: 'https://friendlychat-react-f2b83.firebaseio.com',
  projectId: 'friendlychat-react-f2b83',
  storageBucket: 'friendlychat-react-f2b83.appspot.com',
  messagingSenderId: '126669158051'
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
