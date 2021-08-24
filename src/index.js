import React from 'react';
import ReactDOM from 'react-dom';

import './bootstrap.css';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// App imports Home and Welcome as different components
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// registerServiceWorker();
