import React from 'react';
import { createStore, compose } from 'redux'
import persistStateToLocalStorage from 'redux-localstorage';
import { createDevTools, persistState } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import rootReducer from './reducers'

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='H' defaultIsVisible={false} changePositionKey='Q'>
    <LogMonitor />
  </DockMonitor>
);

const finalCreateStore = compose(
  persistStateToLocalStorage(),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
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