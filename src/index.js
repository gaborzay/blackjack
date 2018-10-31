import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import gameReducer from './store/reducers/game';
import playerReducer from './store/reducers/player';
import dealerReducer from './store/reducers/dealer';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = process.env.NODE_ENV  === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  dealer: dealerReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
      <App/>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
