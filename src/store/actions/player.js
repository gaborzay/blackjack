import * as actionTypes from './actionTypes';

export const playerDeal = (hand) => {
  return {
    type: actionTypes.PLAYER_DEAL,
    payload: {
      hand: hand
    }
  };
};

export const playerHit = (card) => {
  return {
    type: actionTypes.PLAYER_HIT,
    payload: {
      card: card
    }
  };
};