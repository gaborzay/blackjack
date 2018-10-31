import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const messages = [
  'Error',
  'Push!',
  'Dealer wins!',
  'Player wins!',
];

const initialState = {
  deck: [],
  message: '',
  dealerWins: 0,
  playerWins: 0
};

const gameInit = (state, action) => {
  return updateObject(state, {
    deck: action.payload.deck
  });
};

const gameDeal = (state, action) => {
  const deck = {...state.deck};
  deck.resetDeckOfCards();
  deck.shuffleDeckOfCards();
  return updateObject(state, {
    deck: deck,
    message: '',
  });
};

const gameDealerWins = (state, action) => {
  const dealerWins = state.dealerWins;
  return updateObject(state, {
    dealerWins: dealerWins + 1,
    message: messages[2]
  });
};

const gamePlayerWins = (state, action) => {
  const playerWins = state.playerWins;
  return updateObject(state, {
    playerWins: playerWins + 1,
    message: messages[3]
  });
};

const gamePlayAgain = (state, action) => {
  return updateObject(state, {
    deck: [],
    message: '',
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_INIT:         return gameInit(state, action);
    case actionTypes.GAME_DEAL:         return gameDeal(state, action);
    case actionTypes.GAME_DEALER_WINS:  return gameDealerWins(state, action);
    case actionTypes.GAME_PLAYER_WINS:  return gamePlayerWins(state, action);
    case actionTypes.GAME_PLAY_AGAIN:   return gamePlayAgain(state, action);
    default:                            return state;
  }
};

export default reducer;