import React from 'react';
import styles from './styles.styl';
import { Currency } from '../../../common';

export default function InvoiceSummary({subtotal, surcharge, surchargeLabel, total}) {
  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.label}>Subtotal</div>
        <div className={styles.value}><Currency value={subtotal} doNotRound /></div>
      </div>

      <div className={styles.operator}>
        <div className={styles.plus}></div>
      </div>

      <div className={styles.item}>
        <div className={styles.label}>{surchargeLabel}</div>
        <div className={styles.value}><Currency value={surcharge} doNotRound /></div>
      </div>

      <div className={styles.operatorEquals}>
        <div className={styles.equals}>
          <div></div> <div></div>
        </div>
      </div>

      <div className={styles.itemTotal}>
        <div className={styles.label}>Total due</div>
        <div className={styles.value}><Currency value={total} doNotRound /></div>
      </div>
    </div>
  );
}
