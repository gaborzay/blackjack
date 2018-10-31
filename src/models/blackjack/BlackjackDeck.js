import Deck from '../Deck';
import SuitModel from "../Suit";
import BlackjackCard from "./BlackjackCard";
import BlackjackHand from "./BlackjackHand";

export default class BlackjackDeck extends Deck {
  addCardToDeck = (options) => {
    const {rank, suit, value} = options;
    const card = new BlackjackCard({
      rank: rank,
      suit: new SuitModel(suit),
      value: value
    });
    this.cards.push(card);
  };

  dealHand = (number) => {
    if (number) {
      if (number > this.remainingCards()) {
        throw new Error("Cannot deal cards. " + this.remainingCards() + " cards remain in the deck.");
      }
      let hand = new BlackjackHand();

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