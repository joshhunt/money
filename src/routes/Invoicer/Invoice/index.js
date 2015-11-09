import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Currency } from '../../../common';
import InvoiceHeader from '../InvoiceHeader';
import InvoiceDetails from '../InvoiceDetails';
import InvoiceItems from '../InvoiceItems';
import InvoiceSummary from '../InvoiceSummary';
import PaymentDetails from '../PaymentDetails';

import styles from './styles.styl';

@connect((state) => {
  return {...state.invoice}
})
export default class Invoice extends Component {

  shouldComponentUpdate() {
    if (window._shouldComponentUpdate !== undefined) {
      return window._shouldComponentUpdate
    } else {
      return true
    }
  }

  render() {
    const props = this.props;

    const firstDetails = [
      {
        big: true,
        label: 'Due amount',
        value: <Currency value={props.total}/>,
      }, {
        label: 'Billed to',
        value: props.clientName
      }, {
        label: 'Role ID',
        value: props.roleId
      },
    ];

    const secondDetails = [
      {
        big: true,
        label: 'Date issued',
        value: props.dateIssued,
      }, {
        label: 'Project',
        value: props.clientProject,
      }, {
        label: 'Invoice ID',
        value: props.invoiceId,
      },
    ];

    const _subtotal = 1200 + 380;
    const summary = {
      subtotal: props.subtotal,
      surcharge: props.surcharge,
      total: props.total
    };

    return (
      <div className={styles.root}>
        <InvoiceHeader name={props.name} abn={props.abn} />

        <InvoiceDetails items={firstDetails} />
        <InvoiceDetails items={secondDetails} />

        <InvoiceItems items={props.invoiceItems} rateUnit={props.rateUnit} />

        <InvoiceSummary {...summary} surchargeLabel="GST 10%" />

        <PaymentDetails left={this.props.paymentDetails} right={this.props.paymentBank} />
      </div>
    );
  }
}