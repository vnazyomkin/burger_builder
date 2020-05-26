import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'
import burgerBuilder from './store/reducers/burgerBuilder';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(burgerBuilder, composeWithDevTools());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
