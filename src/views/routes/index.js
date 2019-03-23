import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { mainLayout } from '../layouts';

import Welcome from '../pages/welcome';
import NotFound from '../pages/notfound';

const L = {
  Welcome: mainLayout(Welcome),
};

const App = () => (
  <Switch>
    <Route exact path="/" component={L.Welcome} />

    <Route component={NotFound} />
  </Switch>
);

export default App;
