import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ isAuthorized }) => (
  <header className="l-header--fullscreen">
    <nav className="l-header-nav">
      <ul className="brand-area">
        <li>
          <NavLink
            to="/"
            style={{
              backgroundImage:
                'url("https://resilienceatlas-assets.s3.amazonaws.com/logo_CI.png")',
            }}
          >
            Resilience Atlas
          </NavLink>
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

          <ul>
            <li>
              Lol
              <ul>
                <li>Lul</li>
              </ul>
            </li>
          </ul>
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
    </nav>
    <ul className="m-journey__paginationlist" />
  </header>
);

export default Header;
