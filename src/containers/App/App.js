import React, {Component} from 'react';
// Styles
import './App.scss';
// Components
import Hand from '../../components/Hand/Hand';
import Card from '../../components/Card/Card';
import Button from '../../components/UI/Button/Button';
import Controller from '../../components/Controller/Controller';
// Models
import DeckModel from "../../models/blackjack/BlackjackDeck";

class App extends Component {
  deck = null;
  cardOptions = {
    suits: [0, 1, 2, 3],
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };
  states = [
    'initial',
    'dealt',
    'finished'
  ];
  messages = [
    'Error',
    'Push!',
    'Player wins!',
    'Dealer wins!',
  ];
  state = {
    gameState: this.states[0],
    dealerHand: null,
    playerHand: null,
    dealerWins: 0,
    playerWins: 0,
    gameMessage: '',
    error: false,
    errorMessage: ''
  };

  // Set the playing Deck
  initialize = (options) => {
    const {ranks, suits} = options;
    const deck = new DeckModel();

    for (let i in ranks) {
      for (let s in suits) {
        const cardUI = <Card
          key={`${suits[s]}_${ranks[i]}`}
          rank={ranks[i]}
          suit={suits[s]}
        />;

        deck.addCardToDeck({
          rank: ranks[i],
          suit: suits[s],
          value: ranks[i],
          ui: cardUI
        });
      }
    }

    return deck;
  };

  // If player has gotten blackjack then turn goes to dealer
  // to check if the deal has gotten blackjack
  // If both deal and player have blackjack then it's a push
  deal = () => {
    try {
      this.deck.resetDeckOfCards();
      this.deck.shuffleDeckOfCards();
      const dealerHand = this.deck.dealHand(1);
      const playerHand = this.deck.dealHand(2);

      this.setState({
        dealerHand: dealerHand,
        playerHand: playerHand,
        gameState: this.states[1]
      });

      if (playerHand.isBlackJack()) {
        this.dealersTurn({
          dealerHand: dealerHand,
          playerHand: playerHand
        });
      }
    } catch (e) {
      console.error(e);
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  };

  // If player hits then check if 21, or busted
  // If 21 then dealers turn
  // If busted then player loses
  hit = () => {
    try {
      const newCard = this.deck.dealCard();
      let {playerHand} = this.state;
      playerHand.addCard(newCard);

      this.setState({
        playerHand: playerHand
      });

      if (playerHand.is21()) {
        this.stand();
      } else if (playerHand.busted()) {
        this.gameFinished({
          dealerHand: this.state.dealerHand,
          playerHand: playerHand
        });
      }
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  };

  // If player stands, then it's the dealer's turn
  stand = () => {
    this.dealersTurn({
      dealerHand: this.state.dealerHand,
      playerHand: this.state.playerHand
    });
  };

  // If the player surrenders, then the dealer wins
  surrender = () => {
    this.gameFinished({
      dealerHand: this.state.dealerHand,
      playerHand: this.state.playerHand
    }, true);
  };

  // Let the dealer play out their hand
  dealersTurn = (hands) => {
    const {playerHand} = hands;
    let {dealerHand} = hands;

    if (playerHand.isBlackJack()) {
      this.dealerHit(dealerHand);
    } else {
      while (dealerHand.score() <= playerHand.score()) {
        dealerHand = this.dealerHit(dealerHand);
      }
    }

    this.gameFinished({
      dealerHand: dealerHand,
      playerHand: playerHand
    });
  };

  dealerHit = (dealerHand) => {
    const newCard = this.deck.dealCard();
    dealerHand.addCard(newCard);
    this.setState({
      dealerHand: dealerHand
    });
    return dealerHand;
  };

  // Calculate scores for game ending
  gameFinished = (options, surrender = false) => {
    const {playerHand} = options;
    const {dealerHand} = options;
    let {dealerWins} = this.state;
    let {playerWins} = this.state;
    let gameMessageID = 0;

    if (
      (playerHand.score() > dealerHand.score() && !playerHand.busted() && !surrender) ||
      (dealerHand.busted())
    ) {
      gameMessageID = 2;
      playerWins++;
    } else if (
      (dealerHand.score() > playerHand.score() && !dealerHand.busted()) ||
      (playerHand.busted()) ||
      surrender
    ) {
      gameMessageID = 3;
      dealerWins++;
    } else {
      gameMessageID = 1;
    }

    this.setState({
      gameState: this.states[2],
      gameMessage: this.messages[gameMessageID],
      dealerWins: dealerWins,
      playerWins: playerWins
    });
  };

  // Initialize the deck again
  playAgain = () => {
    this.deck = this.initialize(this.cardOptions);
    this.setState({gameState: this.states[0]});
    this.deal();
  };

  componentWillMount() {
    this.deck = this.initialize(this.cardOptions);
  }

  render() {
    const {
      dealerHand,
      playerHand,
      gameState,
      gameMessage,
      error,
      errorMessage,
      dealerWins,
      playerWins
    } = this.state;
    let controllerUI = null;

    if (error) {
      alert(errorMessage);
    }

    switch (gameState) {
      case this.states[0]:
        controllerUI = (<Button click={this.deal}>Deal</Button>);
        break;
      case this.states[1]:
        controllerUI = (
          <React.Fragment>
            <Button click={this.hit}>Hit</Button>
            <Button click={this.stand}>Stand</Button>
            <Button click={this.surrender}>Surrender</Button>
          </React.Fragment>
        );
        break;
      case this.states[2]:
        controllerUI = <Button click={this.playAgain}>Play again?</Button>;
        break;
      default:
        console.log(`Unknown game state: ${gameState}`);
    }

    return (
      <div className="App">
        <h1>
          Dealer: <strong>{dealerWins}</strong> |
          Player: <strong>{playerWins}</strong>
        </h1>
        <h1>{gameMessage}</h1>
        <Hand player="Dealer" hand={dealerHand}>
          {dealerHand ? dealerHand.cards.map(card => (card.ui)) : null}
        </Hand>
        <Hand player="Player" hand={playerHand}>
          {playerHand ? playerHand.cards.map(card => (card.ui)) : null}
        </Hand>
        <Controller>
          {controllerUI}
        </Controller>
      </div>
    );
  }
}

export default App;
