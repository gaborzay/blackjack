import React from 'react';
import './Hand.scss';

const hand = (props) => {
  let message = props.status ? <h1>{props.status.message}</h1> : null;

  // Helper methods
  const checkScore = (hand) => {
    let status = null;

    if (hand) {
      if (hand.isBlackJack()) {
        status = {
          status: false,
          message: 'blackjack'
        };
      } else if (hand.is21()) {
        status = {
          status: false,
          message: '21'
        };
      } else if (hand.busted()) {
        status = {
          status: false,
          message: 'busted'
        };
      } else {
        status = {
          status: true,
          message: ''
        };
      }
      return hand.score();
    }

    return status;
  };

  return (
    <div className="Hand">
      {message}
      <h1 className="Hand__heading">{props.player}</h1>
      <h2 className="Hand__score">Score: {checkScore(props.hand)}</h2>
      <div className="Hand__cards">
        {props.children}
      </div>
    </div>
  );
};

export default hand;