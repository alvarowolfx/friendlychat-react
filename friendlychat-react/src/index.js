import React from 'react';
import ReactDOM from 'react-dom';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import './styles/main.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
