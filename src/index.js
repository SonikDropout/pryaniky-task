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
import { initData, initState } from './JSONforms/init';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(Actions.init(initData, schema, uischema));

const theme = createMuiTheme({ typography: { useNextVariants: true } });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);