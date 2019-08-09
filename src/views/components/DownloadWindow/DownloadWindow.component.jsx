/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
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
  static show(url, type) {
    if (DownloadWindow.__instance) {
      DownloadWindow.__instance.__show(url, type);
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

  __show = (url, type) => {
    this.setState({ open: true, url, type });
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

      {this.renderDownloadButton()}
    </>
  );

  renderContent = () => {
    const { terms_accepted, url } = this.state;

    if (!terms_accepted) {
      return this.renderTerms();
    }

    return (
      <>
        <p>Click to continue with download</p>

        {this.renderDownloadButton()}
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
