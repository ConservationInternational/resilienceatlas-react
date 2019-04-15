import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Loader = ({ loading }) => (
  <div className={cx('m-loader', { 'is-loading': loading })}>loading</div>
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};

export default Loader;
