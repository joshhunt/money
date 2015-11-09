import React from 'react';
import styles from './styles.styl';

export default function InvoiceHeader({name, abn}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerName}>
        <div className={styles.myName}>{name}</div>
        { abn ? <div className={styles.abn}><strong>ABN:</strong> {abn}</div> : null }
      </div>

      <div className={styles.headerHalf}>
        <div className={styles.topRightText}>Invoice</div>
      </div>
    </div>
  );
}