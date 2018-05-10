import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import openSocket from 'socket.io-client';

const socket = openSocket('192.168.2.45:4000');

ReactDOM.render(<App />, document.getElementById('root'));

socket.on('dataset', function(){
    ReactDOM.render(<App />, document.getElementById('root'));
})

registerServiceWorker();
