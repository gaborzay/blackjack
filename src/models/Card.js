export default class Card {
  available = true;
  ui = null;

  constructor(options) {
    this.rank = options['rank'];
    this.suit = options['suit'];
    this.faceValue = options['value'];
  }

  isAvailable = () => (this.available);
  markUnavailable = () => (this.available = false);
  markAvailable = () => (this.available = true);
  setUI = (ui) => (this.ui = ui);
  value = () => (Number.parseInt(this.faceValue));
}