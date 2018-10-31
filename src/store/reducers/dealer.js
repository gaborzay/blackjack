import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  hand: null,
  isFinished: false,
  isBlackJack: false,
  isBusted: false,
  is21: false
};

const dealerInit = (state, action) => {
  return updateObject(state, {
    hand: action.payload.hand
  });
};

const dealerHit = (state, action) => {
  const newHand = {...state.hand};
  newHand.addCard(action.payload.card);
  const isBlackJack = newHand.isBlackJack();
  const is21 = newHand.is21();
  const isBusted = newHand.busted();
  return updateObject(state, {
    hand: newHand,
    is21: is21,
    isBusted: isBusted,
    isBlackJack: isBlackJack,
    isFinished: is21 || isBusted || isBlackJack
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEALER_INIT: return dealerInit(state, action);
    case actionTypes.DEALER_HIT:  return dealerHit(state, action);
    default:                      return state;
  }
};

export default reducer;