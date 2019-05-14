import React from 'react';
import cx from 'classnames';

const PredictiveModels = ({
  models = [],
  model = { categories: [] },
  indicatorRange = {},
}) => (
  <div className="m-predictive-models">
    <p>
      Select a combination of interventions. There are nine levels: extremely,
      very, strongly and moderately less important, equally, and moderately,
      strongly, very and extremely more important.
    </p>
    <div className="model-selector">
      <select className="js-model-selector" aria-label="Select a model">
        <option disabled selected={!model.name}>
          Select a model
        </option>
        {models.map(({ name }) => (
          <option value={name} selected={name === module.name}>
            {name}
          </option>
        ))}
      </select>
    </div>

    {!!model.name && (
      <ul className="indicators-list">
        {model.categories.map(({ name, indicators }) => (
          <>
            <li className="category">{name}</li>

            {indicators.map(
              ({ name, value, id, indexableValue, humanReadableValue }) => {
                const sad = typeof value === 'number';

                return (
                  <li>
                    <div className="m-form-input--switch">
                      <input
                        type="checkbox"
                        className="js-indicator-toggle"
                        data-indicator={name}
                        id={`indicator-${id}`}
                        value={name}
                        checked={sad}
                      />
                      <label htmlFor={`indicator-${id}`} aria-label={name} />
                      {name}
                    </div>
                    <div
                      className={cx('m-form-input--slider', { hidden: !sad })}
                    >
                      <div className="slider-wrapper">
                        <input
                          type="range"
                          className="js-indicator-slider"
                          data-indicator={name}
                          min={indicatorRange.min}
                          max={indicatorRange.max}
                          step="1"
                          value={indexableValue}
                        />
                        <span
                          className="opacity"
                          style={{
                            width: (indexableValue / indicatorRange.max) * 100,
                          }}
                        />
                        <span className="tooltip" hidden />
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
                  </li>
                );
              },
            )}
          </>
        ))}
      </ul>
    )}

    <div className="actions" hidden={!model.name}>
      <button type="button" className="btn -secondary js-reset">
        Reset
      </button>
      <button type="button" className="btn -primary js-apply">
        Apply
      </button>
    </div>
  </div>
);

export default PredictiveModels;
