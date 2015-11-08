import React, { Component } from 'react';

import styles from './styles.styl';

import { Currency } from '../../../common';

import InvoiceHeader from '../InvoiceHeader';
import InvoiceDetails from '../InvoiceDetails';
import InvoiceItems from '../InvoiceItems';
import InvoiceSummary from '../InvoiceSummary';
import PaymentDetails from '../PaymentDetails';

export default function() {

  const firstDetails = [
    {
      big: true,
      label: 'Due amount',
      value: <Currency value='1337'/>,
    }, {
      label: 'Billed to',
      value: 'Ninemsn Pty Ltd'
    }, {
      label: 'Role ID',
      value: '1554'
    },
  ];

  const secondDetails = [
    {
      big: true,
      label: 'Date issued',
      value: '21 Sep, 15',
    }, {
      label: 'Project',
      value: '9Now'
    }, {
      label: 'Invoice ID',
      value: '#542F0E'
    },
  ];

  const invoiceItems = [
    {
      description: 'Brainstorming',
      quantity: 3,
      rate: 180,
      amount: 380,
    }, {
      description: 'Estimations',
      quantity: 5,
      rate: 240,
      amount: 1200,
    }
  ];

  const _subtotal = 1200 + 380;
  const summary = {
    subtotal: _subtotal,
    surcharge: _subtotal * .1,
    surchargeLabel: 'GST 10%',
    total: _subtotal * 1.1,
  }

  return (
    <div className={styles.root}>
      <InvoiceHeader name="Josh Hunt" abn="123 456 789 00" />

      <InvoiceDetails items={firstDetails} />
      <InvoiceDetails items={secondDetails} />

      <InvoiceItems items={invoiceItems} rateUnit="Days" />

      <InvoiceSummary {...summary} />

      <PaymentDetails />
    </div>
  );
}