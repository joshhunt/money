import React, { Component } from 'react';
import styles from './styles.styl';

import cx from 'classnames';

export default class TextField extends Component {

  shouldComponendUpdate(nextProps) {
    return (nextProps.value !== this.props.value) || (nextProps.label !== this.props.label)
  }

  render() {
    return (
      <div className={cx(styles.group, this.props.className)}>
        <input className={styles.input} value={this.props.value} onChange={this.props.onChange} required />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label} >{this.props.label}</label>
      </div>
    );
  }
}