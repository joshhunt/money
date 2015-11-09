import 'babel-core/polyfill'
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {configureStore, DevTools} from './store'

import Editor from './Editor';
import Invoice from './Invoice';

import styles from './styles.styl';

const store = configureStore();

import Perf from 'react-addons-perf';

window.Perf = Perf;

window.perfStart = () => {
  Perf.start();
}

window.perfStop = () => {
  Perf.stop();
}

window.perfGet = () => {
  return Perf.getLastMeasurements();
}

export default class Invoicer extends Component {
  componentDidMount() {
    window.perfStart();
    document.body.classList.add(styles.body);
  }

  render() {
    return (
    <Provider store={store}>
      <div className={styles.root}>
        <Editor onChange={() => {}} />
        <Invoice />
        <DevTools />
      </div>
    </Provider>
    );
  }
}
