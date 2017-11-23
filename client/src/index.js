//import npm module (materialize css ) specific file (minimum css )
//webpack will pack css files + js
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; //gives us direct access to dispatch function - this way we can pass the action and dispatch it whenever we need instead of instantly returning an action.

import App from './components/App';
import reducers from './reducers';

//for testing posts (dev)---------
import axios from 'axios';
window.axios = axios;
//---------------------------

//createStore(reducers, dummy comp, middleware)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//reduxThunk automatically calls functions returned from the actionproducers and passes it a dispatch function as a parameter

//ReactDOM takes (ROOT COMPONENT, where to render)
ReactDOM.render(
  //provider has store prop and takes our store var
  //app is passed to provider as a root component
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

//Test is react env vars are working:
//console.log('Stripe PK is: ', process.env.REACT_APP_STRIPE_KEY);
//console.log('Env is: ', process.env.NODE_ENV);

//Provider is a react-redux component for accessing store from all react components
