import React from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';

// Temporary
const bare = false;

const Head = ({
  site: { color, subdomain, header_theme, header_color, logo_url },
}) => (
  <Helmet defaultTitle="Resilience Atlas" titleTemplate="Resilience Atlas | %s">
    <style type="text/css">{`
      :root {
        --theme-color: ${color};
        --logo-url: url(${logo_url});
        --header-color: ${header_color};
      };
    `}</style>

    <body
      className={cx(
        `is-${subdomain}`,
        `is-${header_theme}`,
        `is-${bare ? '' : 'not-'}bare`,
        `${subdomain === 'atlas' ? 'has' : 'no'}-sidebar-logo`,
        { 'is-indicators': !!subdomain },
      )}
    />
  </Helmet>
);

export default connect(({ site }) => ({ site }))(Head);
