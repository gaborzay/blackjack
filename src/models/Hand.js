export default class Hand {
  cards = [];

  score = () => {
    let score = 0;
    this.cards.forEach(function (card) {
      score += card.value();
    });
    return score;
  };

  addCard = (card) => {
    this.cards.push(card);
  };
}