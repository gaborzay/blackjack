import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  hand: null,
};

const playerDeal = (state, action) => {
  const hand = action.payload.hand;
  return updateObject(state, {
    hand: hand,
    isBlackJack: hand.isBlackJack(),
  });
};

const playerHit = (state, action) => {
  const newHand = {...state.hand};
  newHand.addCard(action.payload.card);
  return updateObject(state, {
    hand: newHand,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYER_DEAL:       return playerDeal(state, action);
    case actionTypes.PLAYER_HIT:        return playerHit(state, action);
    default:                            return state;
  }
};

export default reducer;