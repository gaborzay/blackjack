import React from 'react';
import './Suit.scss';

const suit = (props) => {
  let iconClasses = [];

  switch (props.suit) {
    case 'Spade': iconClasses.push('icon__spade'); break;
    case 'Club': iconClasses.push('icon__club'); break;
    case 'Heart': iconClasses.push('icon__heart'); break;
    case 'Diamond': iconClasses.push('icon__diamond'); break;
    default: throw new Error(`Suit of type ${props.suit} is not defined.`);
  }

  switch (props.size) {
    case 'sm': iconClasses.push('icon--small'); break;
    case 'md': iconClasses.push('icon--medium'); break;
    case 'lg': iconClasses.push('icon--large'); break;
    default: iconClasses.push('icon--medium');
  }

  return (
    <div className="icon">
      <div className={iconClasses.join(' ')}>
        {/*Intentionally empty*/}
      </div>
    </div>
  );
};

export default suit;