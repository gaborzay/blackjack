import Hand from "../Hand";

export default class BlackjackHand extends Hand {
  score = () => {
    let scores = this.possibleScores(),
      maxUnder = Number.MIN_VALUE,
      minOver = Number.MAX_VALUE;

    scores.forEach(function (score) {
      if (score > 21 && score < minOver) {
        minOver = score;
      } else if (score <= 21 && score > maxUnder) {
        maxUnder = score;
      }
    });

    return maxUnder === Number.MIN_VALUE ? minOver : maxUnder;
  };

  /* Return a list of all possible scores this hand could have
  * (evaluating each ace as both 1 and 11) */
  possibleScores = () => {
    let minScore = 0,
      maxScore = 0;

    this.cards.forEach(function (card) {
      minScore += card.minValue();
      maxScore += card.maxValue();
    });

    return [minScore, maxScore];
  };

  isBlackJack = () => (this.cards.length === 2 && this.score() === 21);

  isBusted = () => (this.score() > 21);

  is17 = () => (this.score() > 16);

  is21 = () => (this.score() === 21);
}