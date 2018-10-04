import React from 'react';
import './Card.scss';
import Rank from '../Rank/Rank';
import Suit from '../Suit/Suit';
import SuitModel from '../../models/Suit';

const card = (props) => {
  let cardClasses = ['card'];

  switch (SuitModel.getSuitFromValue(props.suit)) {
    case 'Heart':
    case 'Diamond':
      cardClasses.push('card--red');
      break;
    case 'Spade':
    case 'Club':
      cardClasses.push('card--black');
      break;
    default:
      throw new Error(`Suit of type ${props.suit} is not defined.`);
  }

  return (
    <div className={cardClasses.join(' ')}>
      <div className="card__value card__top-left">
        <Rank rank={props.rank} size="sm"/>
        <Suit suit={props.suit} size="sm"/>
      </div>
      <div className="card__value card__top-right">
        <Rank rank={props.rank} size="sm"/>
        <Suit suit={props.suit} size="sm"/>
      </div>
      <div className="card__value card__middle">
        <Suit suit={props.suit} size="lg"/>
      </div>
      <div className="card__value card__bottom-left">
        <Rank rank={props.rank} size="sm"/>
        <Suit suit={props.suit} size="sm"/>
      </div>
      <div className="card__value card__bottom-right">
        <Rank rank={props.rank} size="sm"/>
        <Suit suit={props.suit} size="sm"/>
      </div>
    </div>
  );
};

export default card;