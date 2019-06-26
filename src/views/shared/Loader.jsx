import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Loader = ({ loading, text }) => (
  <div className={cx('m-loader', { 'is-loading': loading })}>{text}</div>
);

Loader.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
};

Loader.defaultProps = {
  loading: false,
  text: 'loading',
};

export default Loader;
