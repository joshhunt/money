import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import * as actions from '../actions';
import InvoiceItemsEditor from './InvoiceItemsEditor';

import styles from './styles.styl';

console.log(actions);

@ThemeDecorator(ThemeManager.modifyRawThemeFontFamily(ThemeManager.getMuiTheme(LightTheme), 'soleil'))
@connect((state) => {
  return {...state.invoice}
}, actions)
export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {...props};
  }

  _fieldChanged(key, event) {
    this.setState({[key]: event.target.value});
    // this.props.updateInvoiceField(key, event.target.value);
    // const newData = {
    //   ...this.state.data,
    //   [key]: event.target.value,
    // };
    // this.setState({data: newData});

    // this.props.onChange(newData);
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

        <form>
          {fields.map(field => (
            <span key={field.key}>
              <input type="text" value={this.props[field.key]} onChange={this._fieldChanged.bind(this, field.key)} />
              {' '} </span>
          ))}
        </form>

        <InvoiceItemsEditor initialItems={this.props.invoiceItems} baseRate={this.state.data.baseRate} />
      </div>
    );
  }
}