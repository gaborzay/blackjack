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
  // const surrenderButton = <Button
  //   click={this.surrender}
  //   text="Surrender"
  //   color="red">Su</Button>;
  let controllerUI = null;

  if (props.dealer.isInit && props.player.isInit) {
    // Initial State
    controllerUI = (dealButton);
  } else if (!props.player.isFinished) {
    // Player's Turn
    controllerUI = (
      <React.Fragment>
        {hitButton}
        {standButton}
      </React.Fragment>
    );
  } else if (props.player.isFinished) {
    // Dealer's Turn
    // Game Finished
    controllerUI = againButton;
  } else {
    console.log(`Unknown game state`);
  }

  return (
    <div className="Controller">
      {controllerUI}
    </div>
  );
};

export default controller;