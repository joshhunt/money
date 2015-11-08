import React, { Component } from 'react';
import styles from './styles.styl';
import cx from 'classnames';
import { Currency } from '../../common';

import Editor from './Editor';
import InvoiceItems from './InvoiceItems';

export default class Invoicer extends Component {
  constructor() {
    super();
    document.body.classList.add(styles.body);
    const initialFields = JSON.parse(localStorage.getItem('store') || '{}');
    this.state = {fields: initialFields};
  }

  dataChanged(newData) {
    newData.subtotal = newData.invoiceItems.map((item) => item.calculatedAmount )
      .reduce((total, _current = 0) => {
        const current = parseFloat(_current) || 0;
        console.log({_current, current, total});
        return total + current;
      });

    newData.gst = subtotal * .1;
    newData.total = subtotal + gst;

    // this.setState({fields: {...newData} });
    // localStorage.setItem('store', JSON.stringify(newData));
  }

  render() {
    window.editor = this;
    const {fields} = this.state;

    return (
      <div className={styles.root}>

        <Editor initialFields={fields} onChange={this.dataChanged.bind(this)} />

        <div className={styles.invoice}>

          <div className={styles.header}>
            <div className={styles.headerName}>
              <div className={styles.myName}>{fields.name}</div>
              <div className={styles.abn}><strong>ABN:</strong> {fields.abn}</div>
            </div>
            <div className={styles.headerHalf}>
              <div className={styles.topRightText}>Invoice</div>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={cx(styles.detailBox, styles.one)}>
              <div className={styles.detailLabel}>Due amount</div>
              <div className={styles.detailValueBig}><Currency value={fields.total}/></div>
            </div>

            <div className={cx(styles.detailBox, styles.two)}>
              <div className={styles.detailLabel}>Billed to</div>
              <div className={styles.detailValue}>{fields.clientName}</div>
            </div>

            <div className={cx(styles.detailBox, styles.three)}>
              <div className={styles.detailLabel}>Role ID</div>
              <div className={styles.detailValue}>{fields.roleId}</div>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={cx(styles.detailBox, styles.one)}>
              <div className={styles.detailLabel}>Date issued</div>
              <div className={styles.detailValueBig}>21 Sep, 15</div>
            </div>

            <div className={cx(styles.detailBox, styles.two)}>
              <div className={styles.detailLabel}>Project</div>
              <div className={styles.detailValue}>{fields.clientProject}</div>
            </div>

            <div className={cx(styles.detailBox, styles.three)}>
              <div className={styles.detailLabel}>Invoice ID</div>
              <div className={styles.detailValue}>#{fields.invoiceId}</div>
            </div>
          </div>

          <InvoiceItems items={fields.invoiceItems} rateUnit={fields.rateUnit} />

          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Subtotal</div>
              <div className={styles.summaryValue}><Currency value={fields.subtotal} /></div>
            </div>

            <div className={styles.summaryOperator}>
              <div className={styles.summaryPlus}></div>
            </div>

            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>GST 10%</div>
              <div className={styles.summaryValue}><Currency value={fields.gst} /></div>
            </div>

            <div className={styles.summaryOperatorEquals}>
              <div className={styles.summaryEquals}>
                <div></div> <div></div>
              </div>
            </div>

            <div className={styles.summaryItemTotal}>
              <div className={styles.summaryLabel}>Total due</div>
              <div className={styles.summaryValue}>$2,674</div>
            </div>
          </div>

          <div className={styles.paymentDetails}>
            <div className={styles.paymentInstructions}>
              All amounts are in AUD. Please make payment within 30 days via direct debit to account:
            </div>

            <div className={styles.paymentBank}>
              <strong>Name:</strong> Joshua Hunt <br/>
              <strong>Acc:</strong> 1067 8225 <br/>
              <strong>BSB:</strong> 06 2692 <br/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}