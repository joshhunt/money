import React, { Component } from 'react';
import styles from './styles.styl';

import { Currency } from '../../../common';

export default function InvoiceItems({items, rateUnit}) {

  return (
    <div className={styles.root}>

      <div className={styles.header}>
        <div className={styles.cell}>
          Description
        </div>

        <div className={styles.cell}>
          {rateUnit}
        </div>

        <div className={styles.cell}>
          Rate
        </div>

        <div className={styles.cell}>
          Amount
        </div>
      </div>

      {items && items.map((item) => {

        // const rate = (item.calculatedRate === '-' ? item.calculatedRate : `$${item.calculatedRate}`);
        // const amount = (item.calculatedAmount === '-' ? item.calculatedAmount : `$${item.calculatedAmount}`);

        return (
          <div className={styles.row}>
            <div className={styles.cell}>
              {item.description}
            </div>

            <div className={styles.cell}>{item.quantity || '-'}</div>
            <div className={styles.cell}>
              <Currency value={item.rate || '-'} />
            </div>
            <div className={styles.cell}>
              <Currency value={item.amount || '-'} />
            </div>
          </div>
        );
      }) }

    </div>
  );
}
