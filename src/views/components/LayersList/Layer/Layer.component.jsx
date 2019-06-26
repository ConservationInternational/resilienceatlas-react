import React, { useCallback, useContext } from 'react';
import cx from 'classnames';

import InfoWindow from '@components/InfoWindow';
import { LayerManagerContext } from '@contexts/layerManagerCtx';
import { useToggle, useInput, useUpdaterInput, useDebounce } from '@utilities';

const validateOpacity = value => {
  if (Number.isNaN(value)) return 1;
  if (value > 1) return 1;
  if (value < 0) return 0;
  return value;
};

const Layer = ({
  toggle,
  setOpacity,
  id,
  name,
  isActive,
  opacity_text,
  info,
  download,
  download_url,
  dashboard_order,
  withDashboardOrder,
}) => {
  const layerManagerRef = useContext(LayerManagerContext);
  const [isOpen, toggleOpen] = useToggle(false);
  const slider = useInput('opacity_slider', opacity_text);
  const opacityInput = useUpdaterInput(id, opacity_text, v => {
    setOpacity(id, validateOpacity(v / 100));
  });

  const toggleLayer = useCallback(() => toggle(id), [id]);

  useDebounce(
    () => {
      if (slider.value !== opacity_text) {
        setOpacity(id, validateOpacity(slider.value / 100));
      }
    },
    300,
    [slider.value],
  );

  const showInfo = useCallback((e: MouseEvent) => {
    const { name, info } = e.currentTarget.dataset;
    InfoWindow.show(name, JSON.parse(info));
  }, []);

  const fitMapToLayer = useCallback(() => {
    layerManagerRef.current.fitMapToLayer(id);
  }, []);

  return (
    <li
      className={cx('layer', {
        'is-modified': opacity_text !== 100,
        'is-open': isOpen,
        [dashboard_order]: withDashboardOrder && !!dashboard_order,
      })}
    >
      <div className="panel-item-switch m-form-input--switch">
        <input
          type="checkbox"
          data-name={name}
          className="panel-input-switch"
          id={`layer_${id}`}
          checked={isActive}
          onChange={toggleLayer}
        />
        <label htmlFor={`layer_${id}`} />
      </div>

      <div className="panel-item-title">{name}</div>

      <button
        type="button"
        className="btn-locate icon-container"
        data-id={id}
        onClick={fitMapToLayer}
      >
        <svg className="icon icon-zoom-pan">
          <use xlinkHref="#icon-zoom-pan" />
        </svg>
      </button>

      <button
        type="button"
        className="panel-trasparecy-switcher icon-container"
        onClick={toggleOpen}
      >
        <svg
          className="icon icon-settings"
          opacitylevel={opacity_text}
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
            // sketch:type="MSPage"
          >
            <g
              id="Map_UI-amendments"
              // sketch:type="MSArtboardGroup"
              transform="translate(-321.000000, -325.000000)"
              stroke="#C0C0C0"
              fill="#FFFFFF"
            >
              <path
                d="M325.5,339 C327.985281,339 330,336.985281 330,334.5 C330,332.014719 327.428571,330.090909 325.5,325 C323.571429,330.090909 321,332.014719 321,334.5 C321,336.985281 323.014719,339 325.5,339 Z"
                id="opacity"
                // sketch:type="MSShapeGroup"
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
          onClick={showInfo}
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
          <svg className="icon icon-downloads" opacitylevel={opacity_text}>
            <use xlinkHref="#icon-downloads" />
          </svg>
        </a>
      )}
      <div className="panel-item-slider">
        <div className="m-form-input--slider">
          <div className="slider-wrapper">
            <input
              data-id={id}
              id="fader"
              className="opacity-range"
              {...slider}
              type="range"
              min="0"
              max="100"
              step="1"
            />
            <span className="opacity" style={{ width: `${slider.value}%` }} />
          </div>
          <div className="value">
            <input
              type="number"
              className="opacity-teller"
              layer={id}
              {...opacityInput}
              min="0"
              max="100"
              step="1"
            />
            <span>%</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Layer;
