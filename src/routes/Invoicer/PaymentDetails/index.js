import React from 'react';
import styles from './styles.styl';

export default function PaymentDetails() {
  return (
    <div className={styles.root}>
      <div className={styles.paymentInstructions}>
        All amounts are in AUD. Please make payment within 30 days via direct debit to account:
      </div>

      <div className={styles.paymentBank}>
        <strong>Name:</strong> Joshua Hunt <br/>
        <strong>Acc:</strong> 1067 8225 <br/>
        <strong>BSB:</strong> 06 2692 <br/>
      </div>
    </div>
  );
}