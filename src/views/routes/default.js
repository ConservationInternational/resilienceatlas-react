import React from 'react';
import { Switch, Route } from 'react-router-dom';

import auth, { SHARED, LOGGED, UNLOGGED } from '../utils/authorization';
import { mainLayout, fullscreenLayout, reportLayout } from '../layouts';

import Welcome from '../pages/welcome';
import About from '../pages/about';
import Journeys from '../pages/journeys';
import Slide from '../components/Journey/Slides';
import MapPage from '../pages/map';
import Report from '../pages/report';
import Journey from '../pages/journey';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Me from '../pages/me';
import ProfileSettings from '../pages/profile-settings';

import NotFound from '../pages/notfound';

const shared = auth(SHARED);
const logged = auth(LOGGED);
const unlogged = auth(UNLOGGED);

const Layout = {
  Welcome: mainLayout(Welcome),
  About: mainLayout(About),
  Journeys: mainLayout(Journeys),
  Journey: fullscreenLayout(Journey),
  Slide: fullscreenLayout(Slide),
  Map: fullscreenLayout(MapPage),
  Report: reportLayout(Report),
  Login: mainLayout(Login),
  Signup: mainLayout(Signup),
  Me: mainLayout(Me),
  ProfileSettings: mainLayout(ProfileSettings),
};

const Auth = {
  Welcome: shared(Layout.Welcome),
  About: shared(Layout.About),
  Journeys: shared(Layout.Journeys),
  Journey: shared(Layout.Journey),
  Slide: shared(Layout.Slide),
  Map: shared(Layout.Map),
  Report: shared(Layout.Report),
  Login: unlogged(Layout.Login),
  Signup: unlogged(Layout.Signup),
  Me: logged(Layout.Me),
  ProfileSettings: logged(Layout.ProfileSettings),
};

const DefaultRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth.Welcome} />
    <Route exact path="/about" component={Auth.About} />
    <Route exact path="/journeys" component={Auth.Journeys} />
    <Route exact path="/map" component={Auth.Map} />
    <Route exact path="/report" component={Auth.Report} />
    <Route exact path="/journeys/:id" component={Auth.Journey} />
    <Route exact path="/journeys/:id/:step" component={Auth.Slide} />

    <Route exact path="/login" component={Auth.Login} />
    <Route exact path="/register" component={Auth.Signup} />

    <Route exact path="/me" component={Auth.Me} />
    <Route exact path="/profile-settings" component={Auth.ProfileSettings} />

    <Route component={NotFound} />
  </Switch>
);

export default DefaultRoutes;
