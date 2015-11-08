export const UPDATE_INVOICE = 'UPDATE_INVOICE';

export function updateInvoice(invoice) {
  return { type: types.UPDATE_INVOICE, invoice }
}
