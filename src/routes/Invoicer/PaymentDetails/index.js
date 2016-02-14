import React, { Component } from 'react';
import styles from './styles.styl';
import Remarkable from 'remarkable';

const md = new Remarkable();

export default class PaymentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = this.renderMarkdown(props, true)
  }

  componentWillReceiveProps(nextProps, force) {
    this.setState(this.renderMarkdown(nextProps));
  }

  renderMarkdown(nextProps, force) {
    const state = {}

    if (force || nextProps.left !== this.props.left) {
      state.mdLeft = md.render(nextProps.left);
    }

    if (force || nextProps.right !== this.props.right) {
      state.mdRight = md.render(nextProps.right);
    }

    return state
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.paymentInstructions} dangerouslySetInnerHTML={{__html: this.state.mdLeft}}></div>
        <div className={styles.paymentBank} dangerouslySetInnerHTML={{__html: this.state.mdRight}}></div>
      </div>
    );
  }
}
