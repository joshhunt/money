import 'babel-core/polyfill'
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {configureStore, DevTools} from './store'

import Editor from './Editor';
import Invoice from './Invoice';

import styles from './styles.styl';

const store = configureStore()

export default class Invoicer extends Component {
  componentDidMount() {
    document.body.classList.add(styles.body);
  }

  render() {
    return (
    <Provider store={store}>
      <div className={styles.root}>
      <Editor />
      <Invoice />
      <DevTools />
      </div>
    </Provider>
    );
  }
}
