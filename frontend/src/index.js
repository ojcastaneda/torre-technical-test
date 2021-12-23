import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <App className='h-100 app'/>
  </React.StrictMode>,
  document.getElementById('root')
);
