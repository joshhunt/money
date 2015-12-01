import moment from 'moment';

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_INVOICE_ITEM = 'UPDATE_INVOICE_ITEM';

export const MAKE_INVOICE_MONTH = 'MAKE_INVOICE_MONTH';
export const NEW_INVOICE_ID = 'NEW_INVOICE_ID';

window.moment = moment;

export function updateInvoiceField(fieldName, fieldValue) {
  return {
    fieldName, fieldValue,
    type: UPDATE_FIELD,
  }
}

export function updateInvoiceItem(itemIndex, fieldName, fieldValue) {
  return {
    itemIndex, fieldName, fieldValue,
    type: UPDATE_INVOICE_ITEM,
  }
}

export function makeInvoiceMonth() {
  return {type: MAKE_INVOICE_MONTH}
}

export function newInvoiceId() {
  return {
    fieldName: 'invoiceId',
    fieldValue: (Math.floor(Date.now() / 1000)).toString(36).toUpperCase(),
    type: UPDATE_FIELD,
  }
}


export function issueToday() {
  return {
    fieldName: 'dateIssued',
    fieldValue: moment(new Date()).format('D MMM gggg'),
    type: UPDATE_FIELD,
  }
}
