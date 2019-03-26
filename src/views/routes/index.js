import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { mainLayout } from '../layouts';

import Welcome from '../pages/welcome';
import About from '../pages/about';
import Journeys from '../pages/journeys';

import NotFound from '../pages/notfound';

const L = {
  Welcome: mainLayout(Welcome),
  About: mainLayout(About),
  Journeys: mainLayout(Journeys),
};

const App = () => (
  <Switch>
    <Route exact path="/" component={L.Welcome} />
    <Route exact path="/about" component={L.About} />
    <Route exact path="/journeys" component={L.Journeys} />

    <Route component={NotFound} />
  </Switch>
);

export default App;
