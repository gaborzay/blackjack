export default class Card {
  constructor(options) {
    const {rank, suit, value} = options;
    this.available = true;
    this.rank = rank;
    this.suit = suit;
    this.faceValue = value;
  }

  isAvailable = () => (this.available);
  markUnavailable = () => (this.available = false);
  markAvailable = () => (this.available = true);
  value = () => (Number.parseInt(this.faceValue));
}