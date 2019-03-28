import React from 'react';
import { Switch, Route } from 'react-router-dom';

import auth, { SHARED, LOGGED, UNLOGGED } from '../utils/authorization';
import { mainLayout, fullscreenLayout } from '../layouts';

import Welcome from '../pages/welcome';
import About from '../pages/about';
import Journeys from '../pages/journeys';
import MapPage from '../pages/map';

import NotFound from '../pages/notfound';

const shared = auth(SHARED);
const logged = auth(LOGGED);
const unlogged = auth(UNLOGGED);

const L = {
  Welcome: mainLayout(Welcome),
  About: mainLayout(About),
  Journeys: mainLayout(Journeys),
  Map: fullscreenLayout(MapPage),
};

const Auth = {
  Welcome: shared(L.Welcome),
  About: shared(L.About),
  Journeys: shared(L.Journeys),
  Map: shared(L.Map),
};

const App = () => (
  <Switch>
    <Route exact path="/" component={Auth.Welcome} />
    <Route exact path="/about" component={Auth.About} />
    <Route exact path="/journeys" component={Auth.Journeys} />
    <Route exact path="/map" component={Auth.Map} />

    <Route component={NotFound} />
  </Switch>
);

export default App;
