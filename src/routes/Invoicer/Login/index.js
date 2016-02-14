import React, { Component } from 'react';

import styles from './styles.styl';

export default class Login extends Component {

  static contextTypes = {
    firebase: React.PropTypes.any,
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.box}>
          <button className={styles.facebookBtn} onClick={this.context.firebase.login.bind(this.context.firebase)}>
            Login with Facebook
          </button>
        </div>
      </div>
    );
  }
}
