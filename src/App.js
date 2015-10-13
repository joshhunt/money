import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl'

class Currency extends Component {
  render() {
    return <FormattedNumber value={this.props.value} style="currency" currency="USD" />
  }
}

export class App extends Component {
  constructor() {
    super();
    this.state = {
      gst: 0,
      tax: 0,
      income: 0,
      invoiceTotal: 0,
      spendingMoney: 0,
      yearlyIncome: 0,
      rate: 1,
    };
  };

  handleChange(event) {
    const invoiceTotal = parseFloat(event.target.value);
    const income = invoiceTotal / 1.10;
    const yearlyIncome = income * 12;
    const gst = invoiceTotal - income;
    let rate;

    if (yearlyIncome >= 180000) {
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

    const tax = income * rate;
    const spendingMoney = income - tax;
    this.setState({invoiceTotal, income, gst, rate, tax, spendingMoney, yearlyIncome});
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)}  />
        <h4>Invoice total: <Currency value={this.state.invoiceTotal} /> </h4>

        <table>
          <tbody>

            <tr>
              <td>invoiceTotal</td>
              <td><Currency value={this.state.invoiceTotal} /></td>
            </tr>
            <tr>
              <td>income</td>
              <td><Currency value={this.state.income} /></td>
            </tr>
            <tr>
              <td>gst</td>
              <td><Currency value={this.state.gst} /></td>
            </tr>
            <tr>
              <td>rate</td>
              <td>{this.state.rate * 100}%</td>
            </tr>
            <tr>
              <td>tax</td>
              <td><Currency value={this.state.tax} /></td>
            </tr>
            <tr>
              <td>spendingMoney</td>
              <td><Currency value={this.state.spendingMoney} /></td>
            </tr>
            <tr>
              <td>yearlyIncome</td>
              <td><Currency value={this.state.yearlyIncome} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}