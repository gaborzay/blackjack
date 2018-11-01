import * as actionTypes from './actionTypes';

export const dealerDeal = (hand) => {
  return {
    type: actionTypes.DEALER_DEAL,
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