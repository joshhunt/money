import { combineReducers } from 'redux'
import { UPDATE_INVOICE } from './actions'

const initialState = {};

function invoice(state = initialState, action) {
  switch (action.type) {

    case UPDATE_INVOICE:
        return state;

    default:
      return state
  };
}

const rootReducer = combineReducers({invoice})
export default rootReducer