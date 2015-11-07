import React, { Component } from 'react';
import styles from './styles.styl';
import cx from 'classnames';

// import Editor from './Editor';

export default class Invoicer extends Component {
  constructor() {
    super();
    document.body.classList.add(styles.body);
  }

  render() {
    return (
      <div className={styles.root}>

        <Editor />

        <div className={styles.invoice}>

          <div className={styles.header}>
            <div className={styles.headerName}>
              <div className={styles.myName}>Josh Hunt</div>
              <div className={styles.abn}><strong>ABN:</strong> 811 550 972 55</div>
            </div>
            <div className={styles.headerHalf}>
              <div className={styles.topRightText}>Invoice</div>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={cx(styles.detailBox, styles.one)}>
              <div className={styles.detailLabel}>Due amount</div>
              <div className={styles.detailValueBig}>$2,674</div>
            </div>

            <div className={cx(styles.detailBox, styles.two)}>
              <div className={styles.detailLabel}>Billed to</div>
              <div className={styles.detailValue}>Ninemsn Pty Ltd</div>
            </div>

            <div className={cx(styles.detailBox, styles.three)}>
              <div className={styles.detailLabel}>Role ID</div>
              <div className={styles.detailValue}>5775</div>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={cx(styles.detailBox, styles.one)}>
              <div className={styles.detailLabel}>Date issued</div>
              <div className={styles.detailValueBig}>21 Sep, 15</div>
            </div>

            <div className={cx(styles.detailBox, styles.two)}>
              <div className={styles.detailLabel}>Project</div>
              <div className={styles.detailValue}>TV Team - 9Now</div>
            </div>

            <div className={cx(styles.detailBox, styles.three)}>
              <div className={styles.detailLabel}>Invoice ID</div>
              <div className={styles.detailValue}>#89FC0FB</div>
            </div>
          </div>


          <div className={styles.invoiceTable}>

            <div className={styles.invoiceRowHeader}>
              <div className={styles.invoiceCell}>
                Description
              </div>

              <div className={styles.invoiceCell}>
                Days
              </div>

              <div className={styles.invoiceCell}>
                Rate
              </div>

              <div className={styles.invoiceCell}>
                Amount
              </div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Estimations
              </div>

              <div className={styles.invoiceCell}>2</div>
              <div className={styles.invoiceCell}>$190</div>
              <div className={styles.invoiceCell}>$380</div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Brainstorming
              </div>

              <div className={styles.invoiceCell}>2</div>
              <div className={styles.invoiceCell}>$190</div>
              <div className={styles.invoiceCell}>$380</div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Agile development surcharge
              </div>

              <div className={styles.invoiceCell}>3</div>
              <div className={styles.invoiceCell}>$190</div>
              <div className={styles.invoiceCell}>$570</div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Web development, 1 Oct - 6 Oct
              </div>

              <div className={styles.invoiceCell}>5</div>
              <div className={styles.invoiceCell}>$267</div>
              <div className={styles.invoiceCell}>$1337</div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Web development, 1 Oct - 6 Oct
              </div>

              <div className={styles.invoiceCell}>5</div>
              <div className={styles.invoiceCell}>$267</div>
              <div className={styles.invoiceCell}>$1337</div>
            </div>

            <div className={styles.invoiceRow}>
              <div className={styles.invoiceCell}>
                Web development, 1 Oct - 6 Oct
              </div>

              <div className={styles.invoiceCell}>5</div>
              <div className={styles.invoiceCell}>$267</div>
              <div className={styles.invoiceCell}>$1337</div>
            </div>

          </div>

          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Subtotal</div>
              <div className={styles.summaryValue}>$2,430</div>
            </div>

            <div className={styles.summaryOperator}>
              <div className={styles.summaryPlus}></div>
            </div>

            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>GST 10%</div>
              <div className={styles.summaryValue}>$244</div>
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