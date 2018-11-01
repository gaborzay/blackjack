import React, {Component} from 'react';
import {connect} from 'react-redux';
// Styles
import './App.scss';
// Components
import Hand from '../../components/Hand/Hand';
import Card from '../../components/Card/Card';
import Controller from '../../components/Controller/Controller';
import * as actions from '../../store/actions';

const DEALER_CARD_TIME_OUT = 500;
const PLAYER_CARD_TIME_OUT = 250;

class App extends Component {
  cardOptions = {
    suits: [0, 1, 2, 3],
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };

  componentWillMount() {
    this.props.onGameInit(this.cardOptions);
  }

  componentDidUpdate() {
    const {
      gameState,
      dealerHand,
      playerHand
    } = this.props;

    switch (gameState) {
      case 'GAME_PLAYER':
        if (playerHand.isBusted() || playerHand.is21()) {
          this.props.onGamePlayerStand();
        }
        break;
      case 'GAME_DEALER':
        if (dealerHand.isBusted() || dealerHand.is21() || dealerHand.is17() || playerHand.isBusted()) {
          this.props.onGameDealerStand(dealerHand, playerHand);
        } else {
          setTimeout(() => {
            const {gameDeck} = this.props;
            const card = gameDeck.dealCard();
            this.props.onDealerHit(card);
          }, DEALER_CARD_TIME_OUT);
        }
        break;
      default:
        console.log(`Unknown game state: ${gameState}`);
        break;
    }
  }

  // If player has gotten blackjack then turn goes to dealer
  // to check if the deal has gotten blackjack
  // If both deal and player have blackjack then it's a push
  deal = () => {
    this.props.onGameDeal();
    const dealerHand = this.props.gameDeck.dealHand(1);
    const playerHand = this.props.gameDeck.dealHand(2);
    this.props.onDealerDeal(dealerHand);
    this.props.onPlayerDeal(playerHand);
  };

  // If player hits then check
  // if 21: then dealers turn
  // if busted: then dealers turn (player looses)
  hit = () => {
    setTimeout(() => {
      const card = this.props.gameDeck.dealCard();
      this.props.onPlayerHit(card);
    }, PLAYER_CARD_TIME_OUT);
  };

  // If player stands, then it's the dealer's turn
  stand = () => {
    this.props.onGamePlayerStand();
  };

  // Initialize the deck again
  playAgain = () => {
    this.deal();
  };

  getCardsFromHand = (hand) => {
    return hand ? hand.cards.map(card => (
      <Card
        key={`${card.suit.value}_${card.rank}`}
        rank={card.rank}
        suit={card.suit}
      />)) : null;
  };

  render() {
    const {
      gameMessage,
      gameState,
      dealerHand,
      playerHand,
      dealerWins,
      playerWins
    } = this.props;
    const dealerCards = this.getCardsFromHand(dealerHand);
    const playerCards = this.getCardsFromHand(playerHand);
    const popup = gameMessage ?
      <div className="App__popup">{gameMessage}</div> : null;

    return (
      <div className="App">
        <div className="App__scores">
          Dealer: <strong>{dealerWins}</strong> |
          Player: <strong>{playerWins}</strong>
        </div>
        <div className="App__game">
          <Hand player="Dealer" hand={dealerHand}>{dealerCards} </Hand>
          <Hand player="Player" hand={playerHand}>{playerCards}</Hand>
          {popup}
        </div>
        <div className="App__controls">
          <Controller
            gameState={gameState}
            deal={this.deal}
            hit={this.hit}
            stand={this.stand}
            surrender={this.surrender}
            again={this.playAgain}
          />
        </div>
      </div>
    );
  }
}

const
  mapStateToProps = state => {
    return {
      // Game
      gameDeck: state.game.deck,
      gameState: state.game.state,
      gameMessage: state.game.message,
      dealerWins: state.game.dealerWins,
      playerWins: state.game.playerWins,
      // Dealer
      dealerHand: state.dealer.hand,
      // Player
      playerHand: state.player.hand,
    };
  };

const
  mapDispatchToProps = dispatch => {
    return {
      // Game
      onGameInit: (options) => dispatch(actions.gameInit(options)),
      onGameDeal: () => dispatch(actions.gameDeal()),
      onGamePlayerStand: () => dispatch(actions.gamePlayerStand()),
      onGameDealerStand: (dealerHand, playerHand) => dispatch(actions.gameDealerStand(dealerHand, playerHand)),
      // Dealer
      onDealerDeal: (hand) => dispatch(actions.dealerDeal(hand)),
      onDealerHit: (card) => dispatch(actions.dealerHit(card)),
      // Player
      onPlayerDeal: (hand) => dispatch(actions.playerDeal(hand)),
      onPlayerHit: (card) => dispatch(actions.playerHit(card)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
