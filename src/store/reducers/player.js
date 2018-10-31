import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  hand: null,
  isFinished: false,
  isBlackJack: false,
  isBusted: false,
  is21: false
};

const playerInit = (state, action) => {
  const isBlackJack = action.payload.hand.isBlackJack();
  return updateObject(state, {
    hand: action.payload.hand,
    isBlackJack: isBlackJack,
    isFinished: false
  });
};

const playerHit = (state, action) => {
  const newHand = {...state.hand};
  newHand.addCard(action.payload.card);
  const is21 = newHand.is21();
  const isBusted = newHand.busted();
  return updateObject(state, {
    hand: newHand,
    is21: is21,
    isBusted: isBusted,
    isFinished: is21 || isBusted
  });
};

const playerStand = (state, action) => {
  return updateObject(state, {
    isFinished: true
  });
};

const playerSurrender = (state, action) => {
  return updateObject(state, {
    isFinished: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYER_INIT:       return playerInit(state, action);
    case actionTypes.PLAYER_HIT:        return playerHit(state, action);
    case actionTypes.PLAYER_STAND:      return playerStand(state, action);
    case actionTypes.PLAYER_SURRENDER:  return playerSurrender(state, action);
    default:                            return state;
  }
};

export default reducer;