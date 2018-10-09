import React from 'react';
import './Controller.scss';
import Button from '../../components/UI/Button/Button';

const controller = (props) => {
  let controllerUI = null;

  switch (props.gameState) {
    case props.states[0]:
      controllerUI = (
        <Button click={props.deal} text="Deal" color="green">D</Button>
      );
      break;
    case props.states[1]:
      controllerUI = (
        <React.Fragment>
          <Button click={props.hit} text="Hit" color="yellow">H</Button>
          <Button click={props.stand} text="Stand" color="green">St</Button>
          {/*<Button click={this.surrender} text="Surrender" color="red">Su</Button>*/}
        </React.Fragment>
      );
      break;
    case props.states[2]:
      controllerUI = <Button click={props.again} text="Play again?" color="green">?</Button>;
      break;
    default:
      console.log(`Unknown game state: ${props.gameState}`);
  }

  return (
    <div className="Controller">
      {controllerUI}
    </div>
  );
};

export default controller;