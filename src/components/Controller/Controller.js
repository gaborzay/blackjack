import React from 'react';
import './Controller.scss';

const controller = (props) => {
  return (
    <div className="Controller">
      {props.children}
    </div>
  );
};

export default controller;