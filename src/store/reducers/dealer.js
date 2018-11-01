import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  hand: null,
};

const dealerDeal = (state, action) => {
  return updateObject(state, {
    hand: action.payload.hand,
  });
};

const dealerHit = (state, action) => {
  const newHand = {...state.hand};
  newHand.addCard(action.payload.card);
  return updateObject(state, {
    hand: newHand,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEALER_DEAL:   return dealerDeal(state, action);
    case actionTypes.DEALER_HIT:    return dealerHit(state, action);
    default:                        return state;
  }
};

export default reducer;