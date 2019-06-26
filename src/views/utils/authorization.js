import React from 'react';
import { connect } from 'react-redux';

import NotFound from '../pages/notfound';

export const SHARED = 'SHARED';
export const LOGGED = 'LOGGED';
export const UNLOGGED = 'UNLOGGED';

export default auth => Wrapped => {
  const authorized = ({ logged, ...rest }) => {
    if (auth !== SHARED && auth !== logged) {
      return <NotFound />;
    }

    return <Wrapped {...rest} />;
  };

  return connect(state => ({
    logged: state.user.logged ? LOGGED : UNLOGGED,
    site: state.site,
  }))(authorized);
};
