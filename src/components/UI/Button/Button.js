import React from 'react';
import './Button.scss';

const button = (props) => {
  return (
    <button className="Button" onClick={props.click}>
      {props.children}
    </button>
  );
};

export default button;