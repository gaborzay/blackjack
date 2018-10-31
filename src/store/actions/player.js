import * as actionTypes from './actionTypes';

export const playerInit = (hand) => {
  return {
    type: actionTypes.PLAYER_INIT,
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

export const playerStand = () => {
  return {
    type: actionTypes.PLAYER_STAND
  };
};

export const playerSurrender = () => {
  return {
    type: actionTypes.PLAYER_SURRENDER
  };
};