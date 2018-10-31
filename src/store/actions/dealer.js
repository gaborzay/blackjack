import * as actionTypes from './actionTypes';

export const dealerInit = (hand) => {
  return {
    type: actionTypes.DEALER_INIT,
    payload: {
      hand: hand
    }
  };
};

export const dealerHit = (card) => {
  return {
    type: actionTypes.DEALER_HIT,
    payload: {
      card: card
    }
  };
};