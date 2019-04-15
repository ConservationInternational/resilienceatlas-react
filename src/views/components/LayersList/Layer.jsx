import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggle } from '@modules/layers';

const Layer = ({
  location: { search, pathname },
  history,
  toggleLayer,
  id,
  name,
  active,
  opacity_text,
  info,
  download,
  download_url,
  dashboard_order,
  withDashboardOrder,
}) => (
  // const toggleLayer = useCallback(() => {
  // const { layers = [], ...query } = qs.parse(search, {
  //   ignoreQueryPrefix: true,
  //   parseArrays: true,
  // });
  // const i = layers.findIndex(l => +l.id === id);
  // if (i > -1) {
  //   layers.splice(i, 1);
  // } else {
  //   layers.push({ id, opacity });
  // }
  // history.push({
  //   pathname,
  //   search: qs.stringify({ ...query, layers }),
  // });
  // }, [active]);

  <li
    className={cx('layer', {
      'is-modified': opacity_text !== 100,
      [dashboard_order]: withDashboardOrder && !!dashboard_order,
    })}
  >
    <div className="panel-item-switch m-form-input--switch">
      <input
        type="checkbox"
        data-name={name}
        className="panel-input-switch"
        id={`layer_${id}`}
        checked={active}
        onChange={toggleLayer}
      />
      <label htmlFor={`layer_${id}`} />
    </div>

    <div className="panel-item-title">{name}</div>

    <button type="button" className="btn-locate icon-container" data-id={id}>
      <svg className="icon icon-zoom-pan">
        <use xlinkHref="#icon-zoom-pan" />
      </svg>
    </button>

    <button type="button" className="panel-trasparecy-switcher icon-container">
      <svg
        className="icon icon-settings"
        opacityLevel={opacity_text}
        width="9px"
        height="14px"
        viewBox="0 0 9 14"
        version="1.1"
      >
        <g
          id="Map"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          sketchType="MSPage"
        >
          <g
            id="Map_UI-amendments"
            sketchType="MSArtboardGroup"
            transform="translate(-321.000000, -325.000000)"
            stroke="#C0C0C0"
            fill="#FFFFFF"
          >
            <path
              d="M325.5,339 C327.985281,339 330,336.985281 330,334.5 C330,332.014719 327.428571,330.090909 325.5,325 C323.571429,330.090909 321,332.014719 321,334.5 C321,336.985281 323.014719,339 325.5,339 Z"
              id="opacity"
              sketchType="MSShapeGroup"
            />
          </g>
        </g>
      </svg>
    </button>

    {!!info && (
      <button
        type="button"
        className="btn-info icon-container"
        data-info={info}
        data-name={name}
      >
        <svg className="icon icon-info">
          <use xlinkHref="#icon-info" />
        </svg>
      </button>
    )}

    {!!download && (
      <a
        href={download_url}
        data-name={name}
        className="btn-download icon-container"
        attr="download"
      >
        <svg className="icon icon-downloads" opacityLevel={opacity_text}>
          <use xlinkHref="#icon-downloads" />
        </svg>
      </a>
    )}
  </li>
);
const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleLayer: () => {
    dispatch(toggle(ownProps.id));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Layer);
