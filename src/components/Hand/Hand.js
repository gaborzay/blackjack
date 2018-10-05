import React from 'react';
import './Hand.scss';

const hand = (props) => {
  let message = props.status ? <h1>{props.status.message}</h1> : null;

  return (
    <div className="Hand">
      {message}
      <h1 className="Hand__heading">{props.player}</h1>
      <h2 className="Hand__score">Score: {props.status ? props.status.score : '-'}</h2>
      <div className="Hand__cards">
        {props.children}
      </div>
    </div>
  );
};

export default hand;