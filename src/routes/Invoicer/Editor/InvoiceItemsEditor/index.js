import React, { Component } from 'react';

import TextField from '../../TextField';
import styles from './styles.styl';

export default class InvoiceItemsEditor extends Component {

  _fieldChanged(index, key, event) {
    this.props.onFieldChange(index, key, event.target.value);
  }

  render() {
    return (
      <div className={styles.root}>

        <h3>Invoice items</h3>

        {this.props.items.map((item, index) => {
          return (
            <div key={index} className={styles.fieldRow}>
              <TextField
                className={styles.largeField}
                label='Description'
                value={item.description}
                onChange={this._fieldChanged.bind(this, index, 'description')}
              />

              <TextField
                className={styles.smallField}
                label='Days'
                value={item.quantity}
                onChange={this._fieldChanged.bind(this, index, 'quantity')}
              />

              <TextField
                className={styles.smallField}
                label='Rate'
                value={item.rate}
                onChange={this._fieldChanged.bind(this, index, 'rate')}
              />

              <TextField
                className={styles.smallField}
                label='Amount'
                value={item.amount}
                onChange={this._fieldChanged.bind(this, index, 'amount')}
              />
            </div>
          );
        })}
      </div>
    );
  }
}