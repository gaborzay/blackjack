import React from 'react';
import Card from '../../components/Card/Card';
import DeckModel from '../../models/blackjack/BlackjackDeck';

class Deck extends React.Component {
  state = {
    dealerHand: null,
    playerHand: null,
    error: false,
    errorMessage: ''
  };
  deck = null;
  suits = [0, 1, 2, 3];
  ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  // Helper Methods
  setDeckOfCards = () => {
    const ranks = this.ranks;
    const suits = this.suits;
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
      playerHand: playerHand
    });
  };

  hit = () => {
    try {
      const newCard = this.deck.dealCard();
      let playerHand = this.state.playerHand;
      playerHand.addCard(newCard);
      this.setState({playerHand: playerHand});
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  };

  // Life Cycle Methods
  constructor(props) {
    super(props);
    this.deck = this.setDeckOfCards();
    this.deck.shuffleDeckOfCards();
  }

  render() {
    const dealerHand = this.state.dealerHand;
    const playerHand = this.state.playerHand;
    let dealerHandUI = null;
    let playerHandUI = null;
    let hitButton = null;

    if (dealerHand) {
      dealerHandUI = (
        <React.Fragment>
          <h1>
            Dealer Hand: ({dealerHand.score()}) |
            ({dealerHand.busted() ? 'busted' : ''})
            ({dealerHand.is21() ? '21' : ''})
            ({dealerHand.isBlackJack() ? 'blackjack' : ''})
          </h1>
          {dealerHand.cards.map(card => (card.ui))}
        </React.Fragment>
      );
    }

    if (playerHand) {
      playerHandUI = (
        <React.Fragment>
          <h1>
            Player Hand: ({playerHand.score()}) |
            ({playerHand.busted() ? 'busted' : ''})
            ({playerHand.is21() ? '21' : ''})
            ({playerHand.isBlackJack() ? 'blackjack' : ''})
          </h1>
          {playerHand.cards.map(card => (card.ui))}
        </React.Fragment>
      );
      hitButton = (
        <button onClick={this.hit}>Hit</button>
      );
    }

    if (this.state.error) {
      alert(this.state.errorMessage);
    }

    return (
      <div>
        <div style={{padding: '10px', margin: '10px', display: 'inline-block', border: '1px solid yellow'}}>
          {dealerHandUI}
        </div>
        <div style={{padding: '10px', margin: '10px', display: 'inline-block', border: '1px solid green'}}>
          {playerHandUI}
        </div>
        <div>
          <button onClick={this.deal}>Deal</button>
          {hitButton}
        </div>
      </div>
    );
  }
}

export default Deck;