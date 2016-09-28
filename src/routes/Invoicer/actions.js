import moment from 'moment';

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_INVOICE_ITEM = 'UPDATE_INVOICE_ITEM';

export const MAKE_INVOICE_MONTH = 'MAKE_INVOICE_MONTH';
export const NEW_INVOICE_ID = 'NEW_INVOICE_ID';
export const SET_INVOICE = 'SET_INVOICE';

export const SET_USER = 'SET_USER';
window.moment = moment;

export function setInvoice(data) {
  return {
    data,
    type: SET_INVOICE,
  }
}

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
    fieldValue: moment().diff(new Date(1992, 4, 25), 'hours'),
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


export function setUser(user) {
  return {
    user,
    type: SET_USER,
  }
}
