import React from 'react';
import './Card.scss';
import Rank from '../Rank/Rank';
import Suit from '../Suit/Suit';

class Card extends React.Component {
  state = {
    available: true
  };

  onClickHandler = (event) => {
    const currState = this.state.available;
    this.setState({available: !currState});
  };

  render() {
    let cardClasses = ['card'];
    let cardView = null;

    switch (this.props.suit) {
      case 'Spade':
      case 'Club':
        cardClasses.push('card--black');
        break;
      case 'Heart':
      case 'Diamond':
        cardClasses.push('card--red');
        break;
      default:
        throw new Error(`Suit of type ${this.props.suit} is not defined.`);
    }

    if (this.state.available) {
      cardView = (
        <React.Fragment>
          <div className="card__value card__top-left">
            <Rank rank={this.props.rank} size="sm"/>
            <Suit suit={this.props.suit} size="sm"/>
          </div>
          <div className="card__value card__top-right">
            <Rank rank={this.props.rank} size="sm"/>
            <Suit suit={this.props.suit} size="sm"/>
          </div>
          <div className="card__value card__middle">
            <Suit suit={this.props.suit} size="lg"/>
          </div>
          <div className="card__value card__bottom-left">
            <Rank rank={this.props.rank} size="sm"/>
            <Suit suit={this.props.suit} size="sm"/>
          </div>
          <div className="card__value card__bottom-right">
            <Rank rank={this.props.rank} size="sm"/>
            <Suit suit={this.props.suit} size="sm"/>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className={cardClasses.join(' ')} onClick={this.onClickHandler}>
        {cardView}
      </div>
    );
  }
}

export default Card;