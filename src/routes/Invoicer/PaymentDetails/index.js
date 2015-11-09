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
    console.log('Calling componentWillReceiveProps');
    this.setState(this.renderMarkdown(nextProps));
  }

  renderMarkdown(nextProps, force) {
    console.log('Calling componentWillReceiveProps');
    const state = {}

    if (force || nextProps.left !== this.props.left) {
      console.log('rendering markdown for left');
      state.mdLeft = md.render(nextProps.left);
    }

    if (force || nextProps.right !== this.props.right) {
      console.log('rendering markdown for right');
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
