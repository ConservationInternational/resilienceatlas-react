import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as CustomTypes from '@utilities/propTypes';

export const Pane = ({ children, className, name, activeTab, ...props }) => (
  <div className={cx(className, { active: activeTab === name })} {...props}>
    {children}
  </div>
);

Pane.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  activeTab: PropTypes.string,
};

Pane.defaultProps = {
  children: null,
  className: '',
  activeTab: '',
};

const Tabs = ({ children, activeTab, renderActiveOnly, ...props }) => (
  <div {...props}>
    {React.Children.map(children, Tab => {
      const key = Tab.props.name;

      if (!renderActiveOnly || key === activeTab) {
        return React.cloneElement(Tab, { key, activeTab });
      }

      return null;
    })}
  </div>
);

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  renderActiveOnly: PropTypes.bool,
  children: CustomTypes.componentType(Pane).isRequired,
};

Tabs.defaultProps = {
  // children: null,
  renderActiveOnly: false,
};

Tabs.Pane = Pane;

export default Tabs;
