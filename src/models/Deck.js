import SuitModel from "./Suit";
import CardModel from "./Card";
import HandModel from "./Hand";

export default class Deck {
  cards = [];
  dealtIndex = 0;

  addCardToDeck = (options) => {
    const {rank, suit, value, ui} = options;
    const card = new CardModel({
      rank: rank,
      suit: new SuitModel(suit),
      value: value
    });
    card.setUI(ui);
    this.cards.push(card);
  };

  resetDeckOfCards = () => {
    const dealtIndex = 0;
    let cards = this.cards;

    cards.forEach(function (card) {
      card.markAvailable();
    });

    this.cards = cards;
    this.dealtIndex = dealtIndex;
  };

  shuffleDeckOfCards = () => {
    let cards = this.cards;

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.cards = cards;
  };

  remainingCards = () => {
    const numCards = this.cards.length;
    const dealtIndex = this.dealtIndex;
    return numCards - dealtIndex - 1;
  };

  dealCard = () => {
    if (this.remainingCards()) {
      let cardIndex = ++this.dealtIndex;
      const cards = this.cards;
      const card = cards[cardIndex];

      cards[cardIndex].markUnavailable();

      this.cards = cards;

      return card;
    } else {
      throw new Error("Cannot deal card. " + this.remainingCards() + " cards remain in the deck.");
    }
  };

  dealHand = (number) => {
    if (number) {
      if (number > this.remainingCards()) {
        throw new Error("Cannot deal cards. " + this.remainingCards() + " cards remain in the deck.");
      }
      let hand = new HandModel();

      for (let i = 0; i < number; i++) {
        const card = this.dealCard();
        hand.addCard(card)
      }

      return hand;
    } else {
      throw new Error("dealHand requires a parameter 'number'.");
    }
  };
}