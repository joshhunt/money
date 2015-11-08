import _ from 'lodash';

import { combineReducers } from 'redux';
import { UPDATE_FIELD } from './actions';

const _surchangeRate = .1;
const _subtotal = 1337 * 2;

const initialState = {
  subtotal: _subtotal,
  surcharge: _subtotal * _surchangeRate,
  total: _subtotal * (1 + _surchangeRate),

  name: 'Josh Hunt wowee',
  abn: '123 456 789 00',
  roleId: '1554',

  clientName: 'Ninemsn Pty Ltd',
  clientProject: '9Now',

  dateIssued: '21 Sep, 15',
  invoiceId: '#542F0E',

  baseRate: '150',
  rateUnit: 'Days',

  invoiceItems: [
    {
      description: 'Estimations',
      quantity: 2,
      rate: 190,
      amount: 380,
    }, {
      description: 'Brainstorming',
      quantity: 2,
      rate: 190,
      amount: 380,
    }, {
      description: 'Agile development surcharge',
      quantity: '-',
      rate: '-',
      amount: 570,
    }, {
      description: 'Web development, 1 Oct - 6 Oct',
      quantity: 5,
      rate: 267,
      amount: 1337,
    }
  ],
};

function invoice(state = initialState, action) {
  switch (action.type) {

  case UPDATE_FIELD:
    return {
      ...state,
      [action.fieldName]: action.fieldValue
    }

    // return _.merge({}, state, {
    //   [action.fieldName]: action.fieldValue,
    // });

  default:
    return state
  };
}

const rootReducer = combineReducers({invoice})
export default rootReducer