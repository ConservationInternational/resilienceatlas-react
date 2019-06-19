import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { load as loadMenuItems, makeMenuTree } from '@modules/map_menu_entries';

import { sortBy } from '@utilities';

const byPosition = sortBy('position');

const Header = ({
  loadMenuItems,
  isAuthorized,
  site: { linkback_text, linkback_url },
  menuItems,
}) => {
  useEffect(() => {
    loadMenuItems();
  }, []);

  const renderMenuItem = useCallback(
    ({ id, label, link, children }) => (
      <li key={id}>
        {link ? <a href={link}>{label}</a> : label}

        {!!(children && children.length) && (
          <ul>{children.sort(byPosition).map(renderMenuItem)}</ul>
        )}
      </li>
    ),
    [],
  );

  return (
    <header className="l-header--fullscreen">
      <nav className="l-header-nav">
        <ul className="brand-area">
          <li>
            <NavLink to="/">Resilience Atlas</NavLink>
          </li>
        </ul>

        <ul className="nav-area -resilience">
          <li className="journey-link">
            <NavLink to="/journeys" activeClassName="is-current">
              Journeys
            </NavLink>
          </li>

          <li>
            <NavLink to="/map" activeClassName="is-current">
              Map
            </NavLink>

            <ul>{menuItems.sort(byPosition).map(renderMenuItem)}</ul>
          </li>

          <li>
            <NavLink to="/about" activeClassName="is-current">
              About
            </NavLink>
          </li>

          {isAuthorized ? (
            <>
              <li>
                <NavLink to="/me" activeClassName="is-current">
                  Me
                </NavLink>
              </li>

              <li>
                <NavLink to="/logout" activeClassName="is-current">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeClassName="is-current">
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" activeClassName="is-current">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="nav-area -vital-sign">
          <li>
            <a
              href={linkback_url || 'http://vitalsigns.org/'}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-color link-back"
            >
              {linkback_text || 'Go back to vital signs'}
            </a>
          </li>
        </ul>
      </nav>
      <ul className="m-journey__paginationlist" />
    </header>
  );
};

const makeMapStateToProps = () => {
  const getMenuItems = makeMenuTree();

  const mapStateToProps = state => ({
    isAuthorized: state.user.logged,
    site: state.site,
    menuItems: getMenuItems(state),
  });

  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  { loadMenuItems },
)(Header);
