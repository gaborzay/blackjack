import DeckModel from "../../models/blackjack/BlackjackDeck";
import * as actionTypes from './actionTypes';

export const gameInit = (options) => {
  const {ranks, suits} = options;
  const deck = new DeckModel();

  for (let i in ranks) {
    for (let s in suits) {
      const card = {
        rank: ranks[i],
        suit: suits[s],
        value: ranks[i]
      };
      deck.addCardToDeck(card);
    }
  }

  return {
    type: actionTypes.GAME_INIT,
    payload: {
      deck: deck
    }
  };
};

export const gameDeal = () => {
  return {
    type: actionTypes.GAME_DEAL
  };
};

export const gameDealerWins = () => {
  return {
    type: actionTypes.GAME_DEALER_WINS
  };
};

export const gamePlayerWins = () => {
  return {
    type: actionTypes.GAME_PLAYER_WINS
  };
};

export const gamePlayAgain = () => {
  return {
    type: actionTypes.GAME_PLAY_AGAIN
  };
};