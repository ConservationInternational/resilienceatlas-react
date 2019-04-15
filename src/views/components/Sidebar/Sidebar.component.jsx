import React, { useCallback } from 'react';
import qs from 'qs';
import cx from 'classnames';
import { setRouterParam } from '@utilities';
import LinkButton from '@shared/LinkButton';
import Tabs from '@shared/Tabs';
import LayersList from '../LayersList';

const TABS = {
  LAYERS: 'layers',
  MODELS: 'models',
};

const Sidebar = ({ location: { search } }) => {
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
    <div className="l-sidebar--fullscreen">
      <div className="l-sidebar-content">
        <div className="m-sidebar analysis-panel" id="analysisPanelView">
          <div className="title">
            <button
              className="btn-analysis-panel-contract"
              type="button"
              aria-label="Contract analysis panel"
            >
              Analysis
            </button>
          </div>
          <div className="content">
            <div id="analysisSelectorsView" className="m-analysis-selectors" />
            <div id="analysisView" className="m-analysis" />
          </div>
        </div>
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
              Haha tab two
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
          aria-label="Toggle sidebar"
        />
        <button
          className="btn-analysis-panel-expand"
          type="button"
          aria-label="Expand analysis panel"
        >
          Analysis
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
