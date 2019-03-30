import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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

const Tabs = ({ children, activeTab, ...props }) => (
  <div {...props}>
    {React.Children.map(children, Tab =>
      React.cloneElement(Tab, { key: Tab.props.name, activeTab }),
    )}
  </div>
);

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children(props, propName, componentName) {
    const prop = props[propName];

    let error = null;
    if (React.Children.count(prop) === 0) {
      error = new Error(
        `\`${componentName}\` should have at least one \`Tab.Pane\` inside.`,
      );
    }

    React.Children.forEach(prop, child => {
      if (child.type !== Pane) {
        error = new Error(
          `\`${componentName}\` children should be of type \`Pane\`.`,
        );
      }
    });
    return error;
  },
};

Tabs.defaultProps = {
  children: null,
};

Tabs.Pane = Pane;

export default Tabs;
