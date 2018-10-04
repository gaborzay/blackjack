import Card from '../Card';

export default class BlackjackCard extends Card {
  value = () => (this.isFaceCard() ? 10 : this.faceValue);

  minValue = () => (this.isAce() ? 1 : this.value());

  maxValue = () => (this.isAce() ? 11 : this.value());

  isAce = () => (this.faceValue === 1);

  isFaceCard = () => ([11, 12, 13].indexOf(this.faceValue) > -1);
}