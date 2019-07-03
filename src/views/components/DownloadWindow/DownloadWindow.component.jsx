/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { Link, RouteComponentProps } from 'react-router-dom';

import { clickable } from '@utilities';

interface P extends RouteComponentProps {
  user: Object;
}

interface S {
  open: boolean;
  terms_accepted: boolean;
  url: string;
}

export default class DownloadWindow extends Component<P, S> {
  static show(url) {
    if (DownloadWindow.__instance) {
      DownloadWindow.__instance.__show(url);
    } else {
      throw new Error(
        'There are no any instance of DownloadWindow. You likely forgot to add it to your layout.',
      );
    }
  }

  static hide() {
    DownloadWindow.__instance.__hide();
  }

  constructor(props) {
    super(props);
    DownloadWindow.__instance = this;
  }

  state = {
    open: false,
    terms_accepted: localStorage.getItem('terms_accepted'),
    url: '',
  };

  __show = url => {
    this.setState({ open: true, url });
  };

  __hide = () => {
    this.setState({ open: false, url: null });
  };

  acceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    console.log(checked);

    this.setState(
      {
        terms_accepted: checked,
      },
      () => {
        localStorage.setItem('terms_accepted', checked);
      },
    );
  };

  renderPleaseLogin = () => {
    const {
      location: { pathname, search },
    } = this.props;
    const { url } = this.state;

    return (
      <>
        <p>Before downloading, please login.</p>
        <Link
          to={{
            pathname: '/login',
            state: {
              from: pathname,
              search,
              downloadLayerUrl: url,
            },
          }}
          className="btn btn-secondary theme-bg-color btn-download-infowindow"
        >
          Log in
        </Link>
      </>
    );
  };

  renderTerms = () => {
    const { url, terms_accepted } = this.state;

    return (
      <>
        <p>
          Before download any data, you need to read and accept our{' '}
          <a
            className="theme-color"
            href="http://www.conservation.org/pages/terms.aspx"
          >
            terms of use.
          </a>
        </p>
        <input
          type="checkbox"
          id="terms-and-conditions"
          onChange={this.acceptTerms}
        />
        <label htmlFor="terms-and-conditions">
          I have read and accepted the Conservation International terms of use
        </label>
        <a
          href={url}
          className={cx(
            'btn',
            'btn-secondary',
            'theme-bg-color',
            'btn-download-infowindow',
            { '-disabled': !terms_accepted },
          )}
        >
          Download data
        </a>
      </>
    );
  };

  renderContent = () => {
    const { userLoggedIn } = this.props;
    const { terms_accepted, url } = this.state;

    if (!userLoggedIn) {
      return this.renderPleaseLogin();
    }

    if (!terms_accepted) {
      return this.renderTerms();
    }

    return (
      <>
        <p>Click to continue with download</p>

        <a
          href={url}
          className={cx(
            'btn',
            'btn-secondary',
            'theme-bg-color',
            'btn-download-infowindow',
            { '-disabled': !terms_accepted },
          )}
        >
          Download data
        </a>
      </>
    );
  };

  render() {
    const { open } = this.state;

    if (!open) return null;

    return ReactDOM.createPortal(
      <div className="m-modal-window">
        <div className="modal-wrapper">
          <div className="btn-close" {...clickable(this.__hide)}>
            ×
          </div>
          <div className="modal-container">
            <h1>Download</h1>

            {this.renderContent()}
          </div>
        </div>
        <div className="modal-background" {...clickable(this.__hide)} />
      </div>,
      document.body,
    );
  }
}