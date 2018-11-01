import React from 'react';
import './Hand.scss';

const hand = (props) => {
  return (
    <div className="Hand">
      <div className="Hand__cards">
        {props.children}
      </div>
    </div>
  );
};

export default hand;