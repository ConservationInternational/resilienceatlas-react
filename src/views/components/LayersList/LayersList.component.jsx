import React from 'react';
import cx from 'classnames';
import Loader from '@shared/Loader';

import { useToggle, clickable } from '@utilities';
import Layer from './Layer';

const Subgroup = ({ id, name, active, layers }) => {
  const [isActive, toggleActive] = useToggle(active);

  return (
    <li className="subgroup">
      <div
        className={cx('m-layers-list-header', { 'is-active': !!isActive })}
        {...clickable(toggleActive)}
      >
        <div className="header-title ">{name}</div>
        <div
          id={`categoryHeader_${id}`}
          className="header-switch m-form-input--switch"
        />
      </div>

      {isActive && (
        <ul className={cx('m-layers-list-panel', { 'is-active': !!isActive })}>
          {layers.map(layer => (
            <Layer key={layer.id} {...layer} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Category = ({ id, name, active, layers, subcategory }) => {
  const [isActive, toggleActive] = useToggle(active);

  return (
    <li key={id} className="category">
      <div
        className={cx('m-layers-list-header', {
          'is-active': !!isActive,
        })}
        {...clickable(toggleActive)}
      >
        <div className="header-title">{name}</div>
        <div
          id={`categoryHeader_${id}`}
          className="header-switch m-form-input--switch"
        />
      </div>

      {isActive && (
        <ul
          className={cx('m-layers-list-panel', {
            'is-active': !!isActive,
          })}
        >
          {layers.map(layer => (
            <Layer key={layer.id} {...layer} />
          ))}

          {subcategory.map(subcat => (
            <Subcategory key={subcat.id} {...subcat} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Subcategory = ({ id, name, active, layers, subgroup }) => {
  const [isActive, toggleActive] = useToggle(active);

  return (
    <li className="subcategory">
      <div
        className={cx('m-layers-list-header', { 'is-active': !!isActive })}
        {...clickable(toggleActive)}
      >
        <div className="header-title">{name}</div>
        <div
          id={`categoryHeader_${id}`}
          className="header-switch m-form-input--switch"
        />
      </div>

      {isActive && (
        <ul className={cx('m-layers-list-panel', { 'is-active': !!isActive })}>
          {layers.map(layer => (
            <Layer key={layer.id} {...layer} withDashboardOrder />
          ))}
          {subgroup.map(s_group => (
            <Subgroup key={s_group.id} {...s_group} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Group = ({ id, slug, name, active, layers, categories }) => {
  const [isActive, toggleActive] = useToggle(active);

  return (
    <li key={id} className="group" data-slug={slug}>
      <div
        className={cx('m-layers-list-header', { 'is-active': !!isActive })}
        {...clickable(toggleActive)}
      >
        <div className="header-title theme-color">{name}</div>
      </div>
      {isActive && (
        <ul className={cx('m-layers-list-panel', { 'is-active': !!isActive })}>
          {layers.map(({ dashboard_order, ...layer }) => (
            <Layer key={layer.id} {...layer} withDashboardOrder />
          ))}

          {categories.map(cat => (
            <Category key={cat.id} {...cat} />
          ))}
        </ul>
      )}
    </li>
  );
};

const LayersList = ({ groups, loading }) => (
  <>
    <Loader loading={loading} />

    <ul>
      {groups.map(group => (
        <Group key={group.id} {...group} />
      ))}

      <li>
        <div className="m-layers-list-header">
          <div className="header-title theme-color">basemap</div>
        </div>
        <ul className="m-basemap-selectors">
          <li>
            <button
              type="button"
              className="btn-basemap-handler"
              data-basemap="satellite"
            >
              <span className="icon-satellite">Satellite</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn-basemap-handler"
              data-basemap="topographic"
            >
              <span className="icon-topographic">Topographic</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn-basemap-handler"
              data-basemap="dark"
            >
              <span className="icon-dark">Dark</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              data-basemap="defaultmap"
              className="is-active btn-basemap-handler"
            >
              <span className="icon-default">Default</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </>
);

export default LayersList;
