import React, { FC, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import cx from 'classnames';

import AnalysisPanel from '@components/AnalysisPanel';
import LayersList from '@components/LayersList';
import PredictiveModels from '@components/PredictiveModels';

import LinkButton from '@shared/LinkButton';
import Tabs from '@shared/Tabs';

import { setRouterParam } from '@utilities';

const TABS = {
  LAYERS: 'layers',
  MODELS: 'models',
};

interface P extends RouteComponentProps {
  geojson: L.GeoJSON;
  opened: Boolean;
  analysisOpened: Boolean;
}

const Sidebar: FC<P> = ({
  location: { search },
  opened,
  analysisOpened,
  toggleOpen,
  toggleAnalysis,
}) => {
  const { tab = TABS.LAYERS } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const switchTab = useCallback(
    e => {
      const newTab = e.target.dataset.section;

      if (tab !== newTab) {
        setRouterParam('tab', newTab);
      }
    },
    [tab],
  );

  return (
    <div
      className={cx('l-sidebar--fullscreen', {
        'is-collapsed': !opened,
        analyzing: analysisOpened,
      })}
    >
      <div className="l-sidebar-content">
        <AnalysisPanel toggle={toggleAnalysis} />

        <div className="m-sidebar" id="sidebarView">
          <ul
            id="sidebarTabs"
            className="tabs tabs-secondary-content"
            role="tablist"
            data-tab
          >
            <li className={cx('tab-title', { active: tab === 'layers' })}>
              <LinkButton data-section={TABS.LAYERS} onClick={switchTab}>
                Layers
              </LinkButton>
            </li>
            <li className={cx('tab-title', { active: tab === 'models' })}>
              <LinkButton data-section={TABS.MODELS} onClick={switchTab}>
                Predictive models
              </LinkButton>
            </li>
          </ul>

          <Tabs className="tabs-content content" activeTab={tab}>
            <Tabs.Pane
              id="layersListView"
              className="m-layers-list content"
              name={TABS.LAYERS}
            >
              <LayersList />
            </Tabs.Pane>
            <Tabs.Pane
              id="modelContent"
              className="m-model-content content"
              name={TABS.MODELS}
            >
              <PredictiveModels />
            </Tabs.Pane>
          </Tabs>

          <div className="sidebar-logo">
            <p className="site-title">
              <a
                href="http://www.resilienceatlas.org/"
                target="_blank"
                rel="noopener noreferrer"
                title="Resilience Atlas"
              >
                Resilience Atlas
              </a>
            </p>
            <p className="site-title-by">by</p>
            <a
              className="brand-area"
              href="http://www.conservation.org/"
              target="_blank"
              rel="noopener noreferrer"
              title="Conservation International"
            >
              Conservation International
            </a>
            <p className="site-copyright">© 2016 Conservation International</p>
          </div>
        </div>
        <button
          className="btn-sidebar-toggle"
          type="button"
          onClick={toggleOpen}
          aria-label="Toggle sidebar"
        />
        <button
          className="btn-analysis-panel-expand"
          type="button"
          onClick={toggleAnalysis}
          aria-label="Expand analysis panel"
        >
          Analysis
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
