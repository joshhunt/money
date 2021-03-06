import React from 'react';
import { createStore, compose } from 'redux'
import persistStateToLocalStorage from 'redux-localstorage';

import rootReducer from './reducers'

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
