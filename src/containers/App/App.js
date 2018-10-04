import React, {Component} from 'react';
import './App.scss';
import Deck from '../Deck/Deck';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Deck />
      </div>
    );
  }
}

export default App;
