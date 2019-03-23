import React from 'react';
import cx from 'classnames';
import Helmet from 'react-helmet';

import Header from './_header';
import Footer from './_footer';

// later it will be received from back end
const color = '#0089cc';
const header_theme = 'ci-theme';

export default Page => props => (
  <>
    <Helmet
      defaultTitle="Resilience Atlas"
      titleTemplate="Resilience Atlas | %s"
    >
      <style type="text/css">{`
        :root {
          --theme-color: ${color};
        }
      `}</style>

      <body className={cx({ 'is-not-bare': true }, `is-${header_theme}`)} />
    </Helmet>

    <Header />

    <div className="l-main-fullscreen">
      <Page {...props} />
    </div>

    <Footer />
  </>
);
