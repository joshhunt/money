import _ from 'lodash';
import { combineReducers } from 'redux';

import {
  SET_USER,
  SET_INVOICE,
  UPDATE_FIELD,
  UPDATE_INVOICE_ITEM,
  MAKE_INVOICE_MONTH,
} from './actions';

import makeMonth from './Editor/InvoiceItemsEditor/makeMonth';

function updateOtherStuff(state) {
  state.invoiceItems = cleanItems(state.invoiceItems);
  state.invoiceItems = calculateAmounts(state.invoiceItems, state.baseRate);
  const totals = calcluateTotals(state.invoiceItems);

  return {...state, ...totals};
}

function cleanItems(items) {
  // First get rid of the rows with no description
  items = items
    .map(item => (item.description ? item : null) )
    .filter(Boolean);

  // And then push in a new empty one
  items.push({});

  return items
}


function calculateAmounts(items, defaultRate = 1) {
  let newItems = items.map((_item) => {
    const item = {..._item};

    if (parseFloat(item.quantity)) {
      const rate = parseFloat(item.rate) || defaultRate;
      item.calculatedAmount = parseFloat(item.quantity) * rate;
      item.calculatedRate = rate;
    } else if (parseFloat(item.amount)) {
      item.calculatedAmount = parseFloat(item.amount);
      item.calculatedRate = undefined;
    } else {
      item.calculatedAmount = undefined
      item.calculatedRate = undefined;
    }

    return item;
  });

  return newItems;
}

function calcluateTotals(items) {
  const subtotal = items
    .filter(item => !!item.description)
    .filter(item => !!item.calculatedAmount)
    .map(item => item.calculatedAmount)
    .reduce((total, thisAmount) => {
      return total + thisAmount;
    });

  return {
    subtotal: subtotal,
    surcharge: subtotal * _surchageRate,
    total: subtotal * (1 + _surchageRate),
  }
}


const _surchageRate = .1;
const _subtotal = 1337 * 2;

// let initialState = {
//   subtotal: _subtotal,
//   surcharge: _subtotal * _surchageRate,
//   total: _subtotal * (1 + _surchageRate),

//   name: 'Josh Hunt',
//   abn: '123 456 789 00',
//   roleId: '1554',

//   clientName: 'Ninemsn Pty Ltd',
//   clientProject: '9Now',

//   dateIssued: '21 Sep, 15',
//   invoiceId: '#542F0E',

//   baseRate: '325',
//   rateUnit: 'Days',

//   invoiceItems: [
//     {
//       description: 'Estimations',
//       quantity: 2,
//       rate: 190,
//       amount: 380,
//     }, {
//       description: 'Brainstorming',
//       quantity: 2,
//       rate: 190,
//       amount: 380,
//     }, {
//       description: 'Agile development surcharge',
//       quantity: '-',
//       rate: '-',
//       amount: 570,
//     }, {
//       description: 'Web development, 1 Oct - 6 Oct',
//       quantity: 5,
//       rate: 267,
//       amount: 1337,
//     }
//   ],
// };

// initialState.invoiceItems = makeMonth(new Date());

// initialState.invoiceItems.push({
//   description: 'After hours support',
//   amount: 350,
// });

// initialState = updateOtherStuff(initialState);

let initialState = updateOtherStuff({
  invoiceItems: [{
    description: 'hello',
    quantity: 1,
    rate: 1,
    amount: 1,
  }]
});

function invoice(state = initialState, action) {
  let newState;

  switch (action.type) {

    case SET_INVOICE:
      return {...action.data};

    case UPDATE_FIELD:
      newState = {
        ...state,
        [action.fieldName]: action.fieldValue
      };

      newState = updateOtherStuff(newState);
      return newState;

    case UPDATE_INVOICE_ITEM:
      newState = _.cloneDeep(state)
      newState.invoiceItems[action.itemIndex][action.fieldName] = action.fieldValue;

      newState = updateOtherStuff(newState);
      return newState;

    case MAKE_INVOICE_MONTH:
      newState = {
        ...state,
        invoiceItems: makeMonth(new Date()),
      };

      newState = updateOtherStuff(newState);
      return newState;

    default:
      return state
  };
}

const initialAppState = {
  authActive: false
};

function app(state = initialAppState, action) {
  switch (action.type) {

    case SET_USER:
      return {
        ...state,
        authActive: true,
        user: action.user,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({invoice, app})
export default rootReducer
