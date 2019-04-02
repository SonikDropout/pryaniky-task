import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import schema from './JSONforms/schema.json';
import uischema from './JSONforms/uischema.json';
import { Actions } from '@jsonforms/core';
import rootReducer from './store/reducers';
import { initData, initState } from './JSONforms/init'

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(Actions.init(initData, schema, uischema));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);