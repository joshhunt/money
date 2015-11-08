import React, { Component } from 'react';
import moment from 'moment';

import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import makeMonth from './makeMonth';

import styles from './styles.styl';

@ThemeDecorator(ThemeManager.modifyRawThemeFontFamily(ThemeManager.getMuiTheme(LightTheme), 'soleil'))
export default class InvoiceItemsEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {items: this.props.initialItems || []};
    this._fillOutMonth = this._fillOutMonth.bind(this);
    this._fieldChanged = this._fieldChanged.bind(this);
    this._recalculateAmounts = this._recalculateAmounts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.baseRate !== this.props.baseRate) {
      this._recalculateAmounts(this.state.items, nextProps.baseRate);
    }
  }

  _fillOutMonth() {
    var month = makeMonth(new Date());

    var newInvoiceItems = month.map((week) => {
      const firstMoment = moment(week[0]);
      const lastMoment = moment(week[week.length - 1]);

      return {
        description: `${firstMoment.format('Do')} - ${lastMoment.format('Do MMMM')}`,
        days: week.length,
      }
    });

    console.log(newInvoiceItems);
    this._recalculateAmounts(newInvoiceItems);
  }

  _fieldChanged(itemIndex, itemField, event) {
    this.state.items[itemIndex][itemField] = event.target.value
    this._recalculateAmounts(this.state.items);
  }

  _recalculateAmounts(items, newBaseRate) {

    // First, remove any items with no description
    let newItems = items.map(item => (item.description ? item : null) )
      .filter(Boolean);

    // Then add in an empty row at the end
    newItems.push({});

    // And now calculate the values
    newItems = newItems.map((item) => {
        const rate = item.rate || (newBaseRate || this.props.baseRate);
        const newItem = {...item};
        newItem.calculatedAmount = (parseFloat(item.days) && parseFloat(rate)) ? (rate * item.days) : (item.amount || '-')
        newItem.calculatedRate = parseFloat(rate) || '-';
        return newItem;
      });

    const itemsForInvoice = newItems.map(item => (item.description ? item : null) )
      .filter(Boolean);

    this.props.onChange(itemsForInvoice);
    this.setState({items: newItems});
  }

  render() {

    return (
      <div className={styles.root}>
        <br/>
        <FlatButton label="Fill out month" onClick={this._fillOutMonth} />

        {this.state.items.map((item, index) => {
          return (
            <div key={index}>
              <TextField
                style={{width: '53.5%'}}
                floatingLabelText='Description'
                value={item.description}
                onChange={this._fieldChanged.bind(this, index, 'description')}
              /> {' '}

              <TextField
                style={{width: '14.5%'}}
                floatingLabelText='Days'
                value={item.days}
                onChange={this._fieldChanged.bind(this, index, 'days')}
              /> {' '}

              <TextField
                style={{width: '14.5%'}}
                floatingLabelText='Rate'
                value={item.rate || this.props.baseRate}
                onChange={this._fieldChanged.bind(this, index, 'rate')}
              /> {' '}

              <TextField
                style={{width: '14.5%'}}
                floatingLabelText='Amount'
                value={item.amount || item.calculatedAmount}
                onChange={this._fieldChanged.bind(this, index, 'amount')}
              />
            </div>
          );
        })}
      </div>
    );
  }
}