import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import MuiTextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import * as actions from '../actions';
import InvoiceItemsEditor from './InvoiceItemsEditor';
import TextField from '../TextField';

import styles from './styles.styl';

const rawTheme = ThemeManager.getMuiTheme(LightTheme);
rawTheme.rawTheme.palette.primary1Color = '#4099FF';

@ThemeDecorator(ThemeManager.modifyRawThemeFontFamily(rawTheme, 'soleil'))
@connect((state) => {
  return {...state.invoice}
}, actions)
export default class Editor extends Component {

  constructor(props) {
    super(props);
  }

  _fieldChanged(key, event) {
    this.props.updateInvoiceField(key, event.target.value);
  }

  _invoiceItemsChanged(newInvoiceItems) {
    this._fieldChanged.call(this, 'invoiceItems', {target: {value: newInvoiceItems}});
  }

  render() {
    const fields = [
      {key: 'name', label: 'Your name'},
      {key: 'abn', label: 'ABN'},
      {key: 'clientName', label: 'Client name'},
      {key: 'clientProject', label: 'Client project'},
      {key: 'invoiceId', label: 'Invoice ID'},
      {key: 'roleId', label: 'Role ID'},
      {key: 'baseRate', label: 'Base rate', },
      {key: 'rateUnit', label: 'Rate unit', defaultValue: 'Days'},
    ];

    return (
      <div className={styles.root}>
        <h2 style={{marginTop: 0}}>Edit Invoice</h2>

        <FlatButton label="New Invoice ID" /> {' '}
        <FlatButton label="Generate Month" onClick={this.props.makeInvoiceMonth} /> {' '}

        <form className={styles.form}>
          {fields.map(field => (
            <div className={styles.halfField} key={field.key}>
              <TextField
                label={field.label}
                value={this.props[field.key]}
                onChange={this._fieldChanged.bind(this, field.key)}
              />
            </div>
          ))}
        </form>

        <InvoiceItemsEditor items={this.props.invoiceItems} baseRate={this.props.baseRate} onFieldChange={this.props.updateInvoiceItem} />


        <h3>Payment details</h3>

        <MuiTextField
          style={{width: '100%'}}
          multiLine={true}
          value={this.props.paymentDetails}
          floatingLabelText="Instructions"
          onChange={this._fieldChanged.bind(this, 'paymentDetails')}
        />
        <MuiTextField
          style={{width: '100%'}}
          multiLine={true}
          value={this.props.paymentBank}
          floatingLabelText="Bank details"
          onChange={this._fieldChanged.bind(this, 'paymentBank')}
        />

      </div>
    );
  }
}