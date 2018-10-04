export default class Suit {
  static suits = [
    'Diamond',
    'Club',
    'Heart',
    'Spade',
  ];

  constructor(value) {
    this.value = value;
  }

  static getSuitFromValue = (value) => {
    return Suit.suits[parseInt(value)];
  };
}