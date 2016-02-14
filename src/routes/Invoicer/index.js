import 'babel-core/polyfill'
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'

import MyFirebase from './firebase';
import { configureStore } from './store'

import InvoicerApp from './InvoicerApp';
import Login from './Login';
import styles from './styles.styl';

const store = configureStore();

@connect((state) => ({
  authActive: state.app.authActive,
  isAuthed: !!state.app.user,
}))
class Invoicer extends Component {
  render() {
    const { authActive, isAuthed } = this.props;

    if (!authActive) {
      return <h1>Loading...</h1>
    } else if (isAuthed) {
      return <InvoicerApp />
    } else {
      return <Login />
    }
  }
}

export default class InvoicerRoot extends Component {
  constructor() {
    super();
    this.state = {
      firebase: new MyFirebase(store),
    }
  }

  componentDidMount() {
    document.body.classList.add(styles.body);
  }

  static childContextTypes = {
    firebase: React.PropTypes.any,
  }

  getChildContext() {
    return {
      firebase: this.state.firebase
    };
  }

  render() {
    return (
    <Provider store={store}>
      <Invoicer />
    </Provider>
    );
  }
}
