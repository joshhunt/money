export const UPDATE_FIELD = 'UPDATE_FIELD';

export function updateInvoiceField(fieldName, fieldValue) {
    return {
        fieldName, fieldValue,
        type: UPDATE_FIELD,
    }
}
