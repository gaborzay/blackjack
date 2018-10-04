import React from 'react';
import Card from '../../components/Card/Card';

class Deck extends React.Component {
  state = {
    cards: []
  };

  setDeck = () => {
    const suits = ['Spade', 'Heart', 'Club', 'Diamond'];
    const ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let deck = [];

    for (let i in ranks) {
      for (let s in suits) {
        let card = {
          ui: <Card
            key={`${suits[s]}_${ranks[i]}`}
            rank={ranks[i]}
            suit={suits[s]}
          />,
          value: i
        };
        deck.push(card)
      }
    }
    this.shuffleDeck(deck);
    this.setState({cards: deck});
  };

  shuffleDeck = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  };

  componentWillMount() {
    this.setDeck();
  }

  render() {
    const deck = this.state.cards.map(card => (card.ui));
    return (deck);
  }
}

export default Deck;