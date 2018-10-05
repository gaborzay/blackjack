export default class Card {
  available = true;
  ui = null;

  constructor(options) {
    const {rank, suit, value} = options;
    this.rank = rank;
    this.suit = suit;
    this.faceValue = value;
  }

  isAvailable = () => (this.available);
  markUnavailable = () => (this.available = false);
  markAvailable = () => (this.available = true);
  setUI = (ui) => (this.ui = ui);
  value = () => (Number.parseInt(this.faceValue));
}