import React from 'react';
import ShareModal from '../ShareModal/ShareModal.component';

const downloadURL = `${
  process.env.REACT_APP_API_PROD
}/webshot?filename=export-map-${new Date().getTime()}.pdf&url=${
  window.location.href
}`;

const Toolbar = () => (
  <div className="m-toolbar">
    <ul>
      <li className="search">
        <svg className="icon">
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#icon-search"
          />
        </svg>
        <div className="m-search-map" id="searchBox">
          <input id="searchMap" placeholder="Search area" type="search" />
          <div className="search-box" id="searchContent">
            <div id="search-tpl">
              <div className="search-content">
                <div className="search-result" />
                <div className="search-suggestions" />
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <button type="button" className="btn-share" onClick={ShareModal.show}>
          <svg className="icon">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-share"
            />
          </svg>
        </button>
      </li>
      <li>
        <a
          href={downloadURL}
          rel="noopener noreferrer"
          target="_blank"
          className="btn-export-to-pdf"
        >
          <svg className="icon">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-downloads"
            />
          </svg>
        </a>
      </li>
    </ul>
  </div>
);

export default Toolbar;
