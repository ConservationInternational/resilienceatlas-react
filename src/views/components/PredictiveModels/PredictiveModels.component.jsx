import React, { useEffect, useCallback, Fragment, useState } from 'react';
import qs from 'qs';
import cx from 'classnames';
import Loader from '@shared/Loader';

import { setRouterParam, getRouterParam } from '@utilities';
import {
  getIndexableIndicatorValueRange,
  getValueDescriptionFromIndex,
} from '../../../state/modules/predictive_models/utils';

const [min, max] = getIndexableIndicatorValueRange();
const indicatorRange = { min, max };

const PredictiveModels = ({
  // actions
  loadModels,
  select,
  toggleIndicator,
  updateIndicator,
  // data
  models,
  model,
  modelsLoading,
  modelsLoaded,
  selectedModel,
}) => {
  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const { values } = getRouterParam('model', qs.parse);

    if (model.name && values && values.length) {
      values.forEach((value, index) => {
        const indicator = model.indicators[index];

        if (indicator.indexableValue !== value) {
          updateIndicator(indicator.id, +value || null);
        }
      });
    }
  }, [modelsLoaded]);

  useEffect(() => {
    if (model.name) {
      setRouterParam(
        'model',
        qs.stringify({
          name: selectedModel,
          values: model.indicators.map(ind => ind.indexableValue),
        }),
      );
    }
  }, [model]);

  const onSelect = useCallback(e => {
    select(e.target.value);
  }, []);

  const onToggle = useCallback(e => {
    toggleIndicator(e.target.value);
  }, []);

  const onSliderChange = useCallback(e => {
    const id = e.target.dataset.indicator;
    const indexableValue = +e.target.value;

    updateIndicator(id, indexableValue);
  }, []);

  const onReset = useCallback(() => {}, []);

  return (
    <div className="m-predictive-models">
      <Loader loading={modelsLoading} />
      <p>
        Select a combination of interventions. There are nine levels: extremely,
        very, strongly and moderately less important, equally, and moderately,
        strongly, very and extremely more important.
      </p>
      <div className="model-selector">
        <select
          className="js-model-selector"
          aria-label="Select a model"
          value={model.name || 'default'}
          onChange={onSelect}
        >
          <option disabled value="default">
            Select a model
          </option>
          {models.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {!!model.name && (
        <ul className="indicators-list">
          {model.categories.map(({ name, indicators }) => (
            <Fragment key={name}>
              <li className="category">{name}</li>

              {indicators.map(
                ({ name, value, id, indexableValue, humanReadableValue }) => {
                  const valueExists = typeof value === 'number';
                  const leftOffset =
                    (indexableValue / indicatorRange.max) * 100;
                  const handleSize = 12;

                  return (
                    <li key={id}>
                      <div className="m-form-input--switch">
                        <input
                          type="checkbox"
                          className="js-indicator-toggle"
                          data-indicator={name}
                          id={`indicator-${id}`}
                          value={id}
                          checked={valueExists}
                          onChange={onToggle}
                        />
                        <label htmlFor={`indicator-${id}`} aria-label={name} />
                        {name}
                      </div>
                      {valueExists && (
                        <div
                          className={cx('m-form-input--slider', {
                            hidden: !valueExists,
                          })}
                        >
                          <div className="slider-wrapper">
                            <input
                              type="range"
                              className="js-indicator-slider"
                              data-indicator={id}
                              min={indicatorRange.min}
                              max={indicatorRange.max}
                              step="1"
                              value={indexableValue}
                              onChange={onSliderChange}
                            />
                            <span
                              className="opacity"
                              style={{
                                width: `${leftOffset}%`,
                              }}
                            />
                            <span
                              className="tooltip"
                              style={{
                                left: `calc(${leftOffset}% - ${(leftOffset *
                                  handleSize) /
                                  100}px + ${handleSize / 2}px)`,
                              }}
                            >
                              {getValueDescriptionFromIndex(indexableValue)}
                            </span>
                          </div>
                          <div className="value">
                            <input
                              type="text"
                              className="opacity-teller"
                              value={humanReadableValue}
                              disabled
                            />
                          </div>
                        </div>
                      )}
                    </li>
                  );
                },
              )}
            </Fragment>
          ))}
        </ul>
      )}

      <div className="actions" hidden={!model.name}>
        <button type="button" className="btn -secondary" onClick={onReset}>
          Reset
        </button>
        <button type="button" className="btn -primary js-apply">
          Apply
        </button>
      </div>
    </div>
  );
};

export default PredictiveModels;
