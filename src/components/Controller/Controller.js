import React from 'react';
import './Controller.scss';
import Button from '../../components/UI/Button/Button';

const controller = (props) => {
  const dealButton = <Button
    click={props.deal}
    text="Deal"
    color="green">D</Button>;
  const hitButton = <Button
    click={props.hit}
    text="Hit"
    color="yellow">H</Button>;
  const standButton = <Button
    click={props.stand}
    text="Stand"
    color="green">St</Button>;
  const againButton = <Button
    click={props.again}
    text="Play again?"
    color="green">?</Button>;
  let controllerUI = null;

  switch (props.gameState) {
    case 'GAME_INITIAL':
      controllerUI = dealButton;
      break;
    case 'GAME_PLAYER':
      controllerUI = (
      <React.Fragment>
        {hitButton}
        {standButton}
      </React.Fragment>
      );
      break;
    case 'GAME_DEALER':
      // Don't show controls
      break;
    case 'GAME_FINISHED':
      controllerUI = againButton;
      break;
    default:
      console.log(`Unknown game state: ${props.gameState}`);
      break;
  }

  return (
    <div className="Controller">
      {controllerUI}
    </div>
  );
};

export default controller;