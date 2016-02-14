import React from 'react';

import Editor from './Editor';
import Invoice from './Invoice';

import styles from './styles.styl';

const InvoicerApp = () => {
  return (
    <div className={styles.root}>
      <Editor onChange={() => {}} />
      <Invoice />
    </div>
  );
}

export default InvoicerApp;
