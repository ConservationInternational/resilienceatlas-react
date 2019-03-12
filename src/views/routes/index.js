import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Placeholder from '../components/Placeholder';

const App = () => (
  <Switch>
    <Route exact path="/" component={Placeholder} />
  </Switch>
);

export default App;
