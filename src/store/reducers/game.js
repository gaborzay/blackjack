import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const messages = {
  MESSAGE_INIT: '',
  MESSAGE_PUSH: 'Push!',
  MESSAGE_DEALER_WINS: 'Dealer wins!',
  MESSAGE_PLAYER_WINS: 'Player wins!',
};

const gameState = {
  GAME_INITIAL: 'GAME_INITIAL',
  GAME_PLAYER: 'GAME_PLAYER',
  GAME_DEALER: 'GAME_DEALER',
  GAME_FINISHED: 'GAME_FINISHED'
};

const initialState = {
  deck: [],
  state: gameState.GAME_INITIAL,
  message: '',
  dealerWins: 0,
  playerWins: 0,
};

const gameInit = (state, action) => {
  return updateObject(state, {
    deck: action.payload.deck,
    message: messages.MESSAGE_INIT,
    state: gameState.GAME_INITIAL
  });
};

const gameDeal = (state, action) => {
  const deck = {...state.deck};
  deck.resetDeckOfCards();
  deck.shuffleDeckOfCards();
  return updateObject(state, {
    deck: deck,
    message: messages.MESSAGE_INIT,
    state: gameState.GAME_PLAYER
  });
};

const gamePlayerStand = (state, action) => {
  return updateObject(state, {
    state: gameState.GAME_DEALER
  });
};

const gameDealerStand = (state, action) => {
  const {
    dealerHand,
    playerHand
  } = action.payload;
  let {
    dealerWins,
    playerWins
  } = state;
  let message = messages.MESSAGE_INIT;

  if (playerHand.isBusted()) {
    message = messages.MESSAGE_DEALER_WINS;
    dealerWins++;
  } else if (dealerHand.isBusted()) {
    message = messages.MESSAGE_PLAYER_WINS;
    playerWins++;
  } else if (dealerHand.score() === playerHand.score()) {
    message = messages.MESSAGE_PUSH;
  } else if (dealerHand.score() > playerHand.score()){
    message = messages.MESSAGE_DEALER_WINS;
    dealerWins++;
  } else if (dealerHand.score() < playerHand.score()){
    message = messages.MESSAGE_PLAYER_WINS;
    playerWins++;
  }

  return updateObject(state, {
    state: gameState.GAME_FINISHED,
    message: message,
    dealerWins: dealerWins,
    playerWins: playerWins,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_INIT:         return gameInit(state, action);
    case actionTypes.GAME_DEAL:         return gameDeal(state, action);
    case actionTypes.GAME_PLAYER_STAND: return gamePlayerStand(state, action);
    case actionTypes.GAME_DEALER_STAND: return gameDealerStand(state, action);
    default:                            return state;
  }
};

export default reducer;