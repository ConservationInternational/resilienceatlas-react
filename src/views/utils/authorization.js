import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const SHARED = 'SHARED';
export const LOGGED = 'LOGGED';
export const UNLOGGED = 'UNLOGGED';

export default auth => Wrapped => {
  const authorized = ({ logged, ...rest }) => {
    if (auth !== SHARED && auth !== logged) {
      return <Redirect to="/" />;
    }

    return <Wrapped {...rest} />;
  };

  return connect(state => ({
    logged: state.user.email ? LOGGED : UNLOGGED,
    site: state.site,
  }))(authorized);
};
