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
  state = {
    game: 'deal',
    dealerHand: null,
    playerHand: null,
    error: false,
    errorMessage: ''
  };
  deck = null;
  suits = [0, 1, 2, 3];
  ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  setDeckOfCards = (options) => {
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

  deal = () => {
    this.deck.resetDeckOfCards();
    this.deck.shuffleDeckOfCards();
    const dealerHand = this.deck.dealHand(2);
    const playerHand = this.deck.dealHand(2);
    this.setState({
      dealerHand: dealerHand,
      playerHand: playerHand,
      game: 'dealt'
    });
  };

  hit = () => {
    try {
      const newCard = this.deck.dealCard();
      let playerHand = this.state.playerHand;
      playerHand.addCard(newCard);
      this.setState({
        playerHand: playerHand
      });
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  };

  surrender = () => {
    //
  };

  stand = () => {
    //
  };

  checkScore = (hand) => {
    let status = null;

    if (hand.isBlackJack()) {
      status = {
        status: false,
        message: 'blackjack'
      };
    } else if (hand.is21()) {
      status = {
        status: false,
        message: '21'
      };
    } else if (hand.busted()) {
      status = {
        status: false,
        message: 'busted'
      };
    } else {
      status = {
        status: true,
        message: ''
      };
    }

    return {...status, score: hand.score()};
  };

  componentWillMount() {
    const options = {
      suits: this.suits,
      ranks: this.ranks
    };
    this.deck = this.setDeckOfCards(options);
  }

  render() {
    const dealerHand = this.state.dealerHand;
    const playerHand = this.state.playerHand;
    let controllerUI = null;

    if (this.state.error) {
      alert(this.state.errorMessage);
    }

    switch (this.state.game) {
      case 'deal':
        controllerUI = (<Button click={this.deal}>Deal</Button>);
        break;
      case 'dealt':
        controllerUI = (
          <React.Fragment>
            <Button click={this.hit}>Hit</Button>
            <Button click={this.stand}>Stand</Button>
            <Button click={this.surrender}>Surrender</Button>
          </React.Fragment>
        );
        break;
      case 'stand':
        controllerUI = null;
        break;
      default:
        console.log(`Unknown game state: ${this.state.game}`);
    }

    return (
      <div className="App">
        <Hand player="Dealer" status={dealerHand ? this.checkScore(dealerHand) : null}>
          {dealerHand ? dealerHand.cards.map(card => (card.ui)) : null}
        </Hand>
        <Hand player="Player" status={playerHand ? this.checkScore(playerHand) : null}>
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
