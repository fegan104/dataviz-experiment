import React, { Component } from 'react';
import Home from './components/Home/Home'
import Experiment from './components/Experiment/Experiment'
import ThankYou from './components/ThankYou/ThankYou'
import './App.css';

import { Route, Switch } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { init as firebaseInit } from './FirebaseService'
import { newSession } from './actions/SessionIdActions'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

class App extends Component {

  constructor(props) {
    super(props)

    // Build the middleware for intercepting and dispatching navigation actions
    let middleware = applyMiddleware(
      routerMiddleware(history),
      logger,
      promiseMiddleware()
    );

    this.store = createStore(connectRouter(history)(reducers), middleware);

    firebaseInit();
    this.store.dispatch(newSession())
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">CS 582 Experiment</h1>
            </header>
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/experiment/:id' component={Experiment} />
                <Route path='/thank-you' component={ThankYou} />
              </Switch>
            </main>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
