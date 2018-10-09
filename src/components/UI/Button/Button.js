import React from 'react';
import './Button.scss';

const button = (props) => {
  let classes = ['Button__ui'];

  switch (props.color) {
    case 'green':
      classes = [...classes, 'Button__ui--green'];
      break;
    case 'yellow':
      classes = [...classes, 'Button__ui--yellow'];
      break;
    case 'red':
      classes = [...classes, 'Button__ui--red'];
      break;
    default:
      classes = [...classes, 'Button__ui--black'];
      break;
  }

  return (
    <div className="Button" onClick={props.click}>
      <div className={classes.join(' ')}>
        <div className="Button__icon">
          {props.children}
        </div>
      </div>
      <div className="Button__text">{props.text}</div>
    </div>
  );
};

export default button;