import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { load as loadSites, makeAllSites } from '@modules/sites';

const Header = ({
  loadSites,
  isAuthorized,
  site: { link_text, link_url },
  sites,
}) => {
  useEffect(() => {
    loadSites();
  }, []);

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

            {/* <ul>
            <li>
              Lol
              <ul>
                <li>Lul</li>
              </ul>
            </li>
          </ul> */}
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
              href={link_url || 'http://vitalsigns.org/'}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-color link-back"
            >
              {link_text || 'Go back to vital signs'}
            </a>
          </li>
        </ul>
      </nav>
      <ul className="m-journey__paginationlist" />
    </header>
  );
};

const makeMapStateToProps = () => {
  const allSites = makeAllSites();

  const mapStateToProps = state => ({
    isAuthorized: state.user.logged,
    site: state.site,
    sites: allSites(state),
  });

  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  { loadSites },
)(Header);
