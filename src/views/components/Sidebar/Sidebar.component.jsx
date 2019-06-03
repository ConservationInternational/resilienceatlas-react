import React, { FC, useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import cx from 'classnames';

import AnalysisPanel from '@components/AnalysisPanel';
import LayersList from '@components/LayersList';
import PredictiveModels from '@components/PredictiveModels';

import LinkButton from '@shared/LinkButton';
import Tabs from '@shared/Tabs';

import { setRouterParam } from '@utilities';

export const TABS = {
  LAYERS: 'layers',
  MODELS: 'models',
};

interface P extends RouteComponentProps {
  geojson: L.GeoJSON;
  opened: Boolean;
  analysisOpened: Boolean;
}

const Sidebar: FC<P> = ({
  // Actions
  loadModels,
  toggleOpen,
  toggleAnalysis,
  setTab,
  // Data
  tab,
  opened,
  analysisOpened,
  models,
  modelsLoaded,
  siteLoaded,
}) => {
  useEffect(() => {
    if (siteLoaded) {
      loadModels();
    }
  }, [siteLoaded]);

  useEffect(() => {
    setRouterParam('tab', tab);
  }, [tab]);

  const switchTab = useCallback(
    ({ tab: newTab }) => {
      if (tab !== newTab) {
        setTab(newTab);
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
          <Tabs
            activeTab={tab}
            defaultTab={TABS.LAYERS}
            onTabSwitch={switchTab}
            contentClassName="tabs-content content"
            menuClassName="tabs tabs-secondary-content"
            hideDisabledTitles
            renderTabTitle={({ name, title, active, onTabSwitch }) => (
              <li className={cx('tab-title', { active })}>
                <LinkButton data-section={name} onClick={onTabSwitch}>
                  {title}
                </LinkButton>
              </li>
            )}
          >
            <Tabs.Pane
              id="layersListView"
              className="m-layers-list content"
              title="Layers"
              name={TABS.LAYERS}
            >
              <LayersList />
            </Tabs.Pane>

            <Tabs.Pane
              id="modelContent"
              className="m-model-content content"
              title="Predictive models"
              name={TABS.MODELS}
              disabled={!modelsLoaded || !models.length}
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
