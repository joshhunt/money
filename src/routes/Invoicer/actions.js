export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_INVOICE_ITEM = 'UPDATE_INVOICE_ITEM';

export const MAKE_INVOICE_MONTH = 'MAKE_INVOICE_MONTH';

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
