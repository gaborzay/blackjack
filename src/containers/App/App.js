import React, {Component} from 'react';
import {connect} from 'react-redux';
// Styles
import './App.scss';
// Components
import Hand from '../../components/Hand/Hand';
import Card from '../../components/Card/Card';
import Controller from '../../components/Controller/Controller';
import * as actions from '../../store/actions';

const TIME_OUT = 500;

class App extends Component {
  state = {
    error: false,
    errorMessage: ''
  };
  cardOptions = {
    suits: [0, 1, 2, 3],
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };

  componentWillMount() {
    this.props.onGameInit(this.cardOptions);
  }

  componentDidMount() {
    const {
      playerIsFinished,
      dealerIsFinished
    } = this.props;

    if (playerIsFinished && !dealerIsFinished) {
      this.dealersTurn();
    }
  }

  // If player has gotten blackjack then turn goes to dealer
  // to check if the deal has gotten blackjack
  // If both deal and player have blackjack then it's a push
  deal = () => {
    this.props.onGameDeal();
    const playerHand = this.props.gameDeck.dealHand(2);
    const dealerHand = this.props.gameDeck.dealHand(1);
    this.props.onPlayerInit(playerHand);
    this.props.onDealerInit(dealerHand);
    if (playerHand.isBlackJack()) {
      this.stand();
    }
  };

  // If player hits then check if 21, or busted
  // If 21 then dealers turn
  // If busted then player loses
  hit = () => {
    setTimeout(() => {
      const card = this.props.gameDeck.dealCard();
      this.props.onPlayerHit(card);
      if (this.props.playerIsBusted) {
        this.stand();
      } else if (this.props.is21) {
        this.stand();
      }
    }, TIME_OUT/2);
  };

  // If player stands, then it's the dealer's turn
  stand = () => {
    this.props.onPlayerStand();
    this.dealersTurn();
  };

  // If the player surrenders, then the dealer wins
  surrender = () => {
    this.props.onDealerWins();
  };

  // Initialize the deck again
  playAgain = () => {
    this.deal();
  };

  // Let the dealer play out their hand
  // The dealer hits until it has at least 17
  dealersTurn = (surrender = false) => {
    const {
      gameDeck,
      dealerHand,
      playerHand,
    } = this.props;

    setTimeout(() => {
      if (dealerHand.busted()) {
        this.props.onPlayerWins();
      } else if (dealerHand.score() <= playerHand.score() || dealerHand.score() < 17) {
        const card = gameDeck.dealCard();
        this.props.onDealerHit(card);
        this.dealersTurn();
      } else if (playerHand.score() > dealerHand.score() && !playerHand.busted() && !surrender) {
        this.props.onPlayerWins();
      } else {
        this.props.onDealerWins()
      }
    }, TIME_OUT);
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
      error,
      errorMessage
    } = this.state;
    const {
      gameMessage,
      dealerWins,
      playerWins,
      dealerHand,
      dealerIsBlackjack,
      dealerIsBusted,
      dealerIs21,
      dealerIsFinished,
      playerHand,
      playerIsBlackjack,
      playerIsBusted,
      playerIs21,
      playerIsFinished,
    } = this.props;
    const dealerCards = this.getCardsFromHand(dealerHand);
    const playerCards = this.getCardsFromHand(playerHand);
    const popup = gameMessage ? <div className="App__popup">{gameMessage}</div> : null;

    if (error) {
      alert(errorMessage);
    }

    return (
      <div className="App">
        <div className="App__scores">
          Dealer: <strong>{dealerWins}</strong> |
          Player: <strong>{playerWins}</strong>
        </div>
        <div className="App__game">
          <Hand
            player="Dealer"
            hand={dealerHand}
            isBlackJack={dealerIsBlackjack}
            isBusted={dealerIsBusted}
            is21={dealerIs21}>
            {dealerCards}
          </Hand>
          {popup}
          <Hand
            player="Player"
            hand={playerHand}
            isBlackJack={playerIsBlackjack}
            isBusted={playerIsBusted}
            is21={playerIs21}>
            {playerCards}
          </Hand>
        </div>
        <div className="App__controls">
          <Controller
            dealer={{
              isInit: dealerHand === null,
              isBlackjack: dealerIsBlackjack,
              isBusted: dealerIsBusted,
              is21: dealerIs21,
              isFinished: dealerIsFinished,
            }}
            player={{
              isInit: playerHand === null,
              isBlackjack: playerIsBlackjack,
              isBusted: playerIsBusted,
              is21: playerIs21,
              isFinished: playerIsFinished,
            }}
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

const mapStateToProps = state => {
  return {
    // Game
    gameDeck: state.game.deck,
    gameState: state.game.state,
    gameMessage: state.game.message,
    dealerWins: state.game.dealerWins,
    playerWins: state.game.playerWins,
    // Dealer
    dealerHand: state.dealer.hand,
    dealerIsBlackjack: state.dealer.isBlackJack,
    dealerIsBusted: state.dealer.isBusted,
    dealerIs21: state.dealer.is21,
    dealerIsFinished: state.dealer.isFinished,
    // Player
    playerHand: state.player.hand,
    playerIsBlackjack: state.player.isBlackJack,
    playerIsBusted: state.player.isBusted,
    playerIs21: state.player.is21,
    playerIsFinished: state.player.isFinished,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Game
    onGameInit: (options) => dispatch(actions.gameInit(options)),
    onGameDeal: () => dispatch(actions.gameDeal()),
    // Dealer
    onDealerInit: (hand) => dispatch(actions.dealerInit(hand)),
    onDealerHit: (card) => dispatch(actions.dealerHit(card)),
    onDealerWins: () => dispatch(actions.gameDealerWins()),
    // Player
    onPlayerInit: (hand) => dispatch(actions.playerInit(hand)),
    onPlayerHit: (card) => dispatch(actions.playerHit(card)),
    onPlayerStand: () => dispatch(actions.playerStand()),
    onPlayerWins: () => dispatch(actions.gamePlayerWins()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
