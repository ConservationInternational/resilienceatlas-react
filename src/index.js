import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './views/routes';
import store from './state/store';
import history from './history';
import * as serviceWorker from './serviceWorker';

import './views/styles/index.scss';

import 'leaflet';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

import { load as loadSite } from './state/modules/site';

store.dispatch(loadSite());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
