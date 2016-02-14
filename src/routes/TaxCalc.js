import React, { Component } from 'react';
import {Currency, Percent} from './../common';

import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import TextField from 'material-ui/lib/text-field'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './../styles.styl';

function getTaxRate(rawTaxRate, yearlyIncome) {
  const cleanedTaxRate = rawTaxRate.replace(/[^\d.-]/g, '');
  const parsedTaxRate = parseFloat(cleanedTaxRate);
  let rate = 0.0;

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
  }

  return Math.min(rate, 1);
}

const ResultsTable = ({gst, tax, leftover}) => {
  const gstRow = (
    <tr>
      <td>GST</td>
      <td><strong><Currency value={gst} /></strong></td>
    </tr>
  );

  const taxRow = (
    <tr>
      <td>Tax</td>
      <td><strong><Currency value={tax} /></strong></td>
    </tr>
  );

  const leftoverRow = (
    <tr>
      <td>Leftover</td>
      <td><strong><Currency value={leftover} /></strong></td>
    </tr>
  );


  return (
    <table className={styles.resultsTable}>
      <tbody>
        {gst ? gstRow : <tr></tr> }
        {tax ? taxRow : <tr></tr> }
        {leftover ? leftoverRow : <tr></tr> }
      </tbody>
    </table>
  );
}

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');
const rawTheme = ThemeManager.getMuiTheme(LightTheme);
rawTheme.rawTheme.palette.primary1Color = '#4099FF';

@ThemeDecorator(ThemeManager.modifyRawThemeFontFamily(rawTheme, 'soleil'))
export default class App extends Component {
  constructor() {
    super();
    this._ourData = {
      rawTaxRate: '',
      rawIncome: '',
    };

    this.state = {
      displayRate: 'auto',
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
    this._ourData.rawIncome = event.target.value || '0'
    this.calculate.call(this);
  }

  handleTaxRateChange(event) {
    if (event.target.value === this.state.rate) return

    this._ourData.rawTaxRate = event.target.value || '0'
    this.calculate.call(this);
  }

  calculate() {
    const rawIncome = this._ourData.rawIncome;
    const rawTaxRate = this._ourData.rawTaxRate;

    const invoiceTotal = parseFloat(rawIncome.replace(/[^\d.-]/g, ''));
    const income = invoiceTotal / 1.10;
    const yearlyIncome = income * 12;
    const gst = invoiceTotal - income;

    const rate = getTaxRate(rawTaxRate, yearlyIncome);

    const tax = income * rate;
    const leftover = income - tax;

    const displayRate = `${rate * 100}%`

    this.setState({invoiceTotal, income, gst, rate, tax, leftover, yearlyIncome, displayRate});
  }

  render() {

    const showGst = this.state.gst > 0;
    const showTax = this.state.tax > 0;
    const showResults = showGst || showTax;

    const resultsMarkup = (
      <div className={styles.form} key='lol'>

        <div>
          <h3 className={styles.subheading}>This month</h3>
          <ResultsTable
            gst={this.state.gst}
            tax={this.state.tax}
            leftover={this.state.leftover}
          />
        </div>

        <div>
          <h3 className={styles.subheading}>Annually</h3>
          <ResultsTable
              gst={this.state.gst * 12}
              tax={this.state.tax * 12}
              leftover={this.state.leftover * 12}
            />
        </div>

      </div>
    );

    const textFieldStyles = {
      fontSize: 20,
      lineHeight: 1.5,
      heightFactor: 3,
    }

    const floatingLabelStyle = { top: textFieldStyles.fontSize * 2.4 } // magic!

    textFieldStyles.height = textFieldStyles.fontSize * textFieldStyles.lineHeight * textFieldStyles.heightFactor;

    return (
      <div className={styles.appRoot}>
        <div className={styles.main}>
          <h1 className={styles.heading}>Quick & Dirty Invoice Tax Estimator</h1>

          <div>
            <div className={styles.form}>

              <TextField
                style={textFieldStyles}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={true}
                floatingLabelText='Invoice total'
                hintText='Including GST'
                onChange={this.handleIncomeChange.bind(this)}
              />

              <TextField
                style={textFieldStyles}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={true}
                floatingLabelText={`Tax rate (${this.state.displayRate})`}
                hintText={this.state.displayRate}
                onChange={this.handleTaxRateChange.bind(this)}
              />
            </div>

            <div className={styles.results}>
              <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
                {showResults ? resultsMarkup : null }
              </ReactCSSTransitionGroup>
            </div>

          </div>
        </div>

        <div className={styles.fineprint}>
          <br/>
          <p>
            Assumes only income is from invoices calculated through this site.
            Annual is estimate only, based on monthly income extrapolated over the full year.
            Uses simplier, more conservative, method for calculating tax which should (in most cases) <em>over estimate</em> tax payable and hopefully lead to over savings.
            Of course, this site is not and can not be considered accurate, nor is there any gaurentee that figures shown on this site are correct.
            Always seek your own independant financial advice.
          </p>
        </div>

      </div>
    );
  }
}
