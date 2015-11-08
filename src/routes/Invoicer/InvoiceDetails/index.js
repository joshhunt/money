import React from 'react';
import styles from './styles.styl';

export default function InvoiceDetails({items}) {
  return (
    <div className={styles.row}>

      {items.map((item) => {
        return (
          <div className={styles.box}>
            <div className={styles.label}>{item.label}</div>
            <div className={item.big ? styles.valueBig : styles.value}>{item.value}</div>
          </div>
        );
      })}

    </div>
  );
}