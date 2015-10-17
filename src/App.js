import React, { Component } from 'react';
import numeral from 'numeral';

import styles from './styles.styl';

const Currency = ({value}) => {
  const moolah = numeral(Math.ceil(value)).format('$0,0[.]00');
  return <strong>{moolah}</strong>;
}

const Percent = ({value}) => {
  return <span>{numeral(value).format('0%')}</span>;
}

export class App extends Component {
  constructor() {
    super();
    this._ourData = {
      rawTaxRate: '',
      rawIncome: '',
    };

    this.state = {
      gst: 0,
      tax: 0,
      income: 0,
      invoiceTotal: 0,
      leftover: 0,
      yearlyIncome: 0,
      rate: 1,
    };
  };

  handleIncomeChange(event) {
    if (!event.target.value) { return; }
    this._ourData.rawIncome = event.target.value
    this.calculate.call(this);
  }

  handleTaxRateChange(event) {
    if (!event.target.value) { return; }
    this._ourData.rawTaxRate = event.target.value
    this.calculate.call(this);
  }

  calculate() {
    const rawIncome = this._ourData.rawIncome;
    const rawTaxRate = this._ourData.rawTaxRate;

    const invoiceTotal = parseFloat(rawIncome.replace(/[^\d.-]/g, ''));
    const income = invoiceTotal / 1.10;
    const yearlyIncome = income * 12;
    const gst = invoiceTotal - income;
    let rate;

    const cleanedTaxRate = rawTaxRate.replace(/[^\d.-]/g, '');
    const parsedTaxRate = parseFloat(cleanedTaxRate);

    if (cleanedTaxRate.length && parsedTaxRate > 1) {
      rate = parsedTaxRate / 100;
    } else if (cleanedTaxRate.length && parsedTaxRate > 0) {
      rate = parsedTaxRate;
    } else if (yearlyIncome >= 180000) {
      rate = 0.47;
    } else if (yearlyIncome >= 80000) {
      rate = 0.37;
    } else if (yearlyIncome >= 37000) {
      rate = 0.325;
    } else if (yearlyIncome >= 18200) {
      rate = 0.19;
    } else {
      rate = 0.0;
    }

    if (rate > 1) {
      rate = 1;
    }

    const tax = income * rate;
    const leftover = income - tax;
    this.setState({invoiceTotal, income, gst, rate, tax, leftover, yearlyIncome});
  }

  render() {

    const showGst = this.state.gst > 0;
    const showTax = this.state.tax > 0;
    const showResults = showGst || showTax;

    const baseMarkup = (
      <div>
        <h1>Monthly Invoice GST & Tax Calculator</h1>

        <div className={styles.inputs}>
          <div className={styles.text}>Invoice total</div>
          <input type="text" className={styles.input} placeholder="including GST" onChange={this.handleIncomeChange.bind(this)} />

          <div className={styles.text}>@ tax rate</div>

          <input type="text" className={styles.input} placeholder="auto" onChange={this.handleTaxRateChange.bind(this)} />
        </div>
      </div>
    );

    const notesMarkup = (
      <small style={{fontSize: '14'}}>
        <br/>
        <p>
          Assumes only income is from invoices calculated through this site.<br/>
          Uses simplier, more conservative, method for calculating tax which should (in most cases) <em>over estimate</em> tax payable and hopefully lead to over savings.<br/>
          Of course, this site is not and can not be considered accurate, nor is there any gaurentee that figures shown on this site are correct.<br/>
          Always seek your own independant financial advice.
        </p>
      </small>
    );

    const resultsMarkup = (
      <div>
        <p className={styles.result}>
          Ok, so you need to put away
        </p>

        <ul>
          { showGst
            ? <li><strong><Currency value={this.state.gst} /></strong> for GST</li>
            : null }

          { showTax
            ? <li><strong><Currency value={this.state.tax} /></strong> for income tax <small>({this.state.rate * 100}%)</small></li>
            : null }
        </ul>

        <p>
          And you have <strong><Currency value={this.state.leftover} /></strong> to spend or save or whatever.
        </p>
      </div>
    );

    return (
      <div className={styles.appRoot}>
        {baseMarkup}
        {showResults ? resultsMarkup : null }
        {notesMarkup}
      </div>
    );
  }
}