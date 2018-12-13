import React from 'react';
import ReactDOM from 'react-dom';
import {store, history} from './store'
import {Provider} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App'

const app = 	(<Provider store={store}>
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </ConnectedRouter>
</Provider>)

ReactDOM.render(
  app
  ,
  document.getElementById('root')
)