import React from 'react';
import DangerousHTML from 'react-dangerous-html';
import Iframe from 'react-iframe';

const JourneyEmbed = ({ theme, mapUrl, btnUrl, maskSql, aside }) => (
  <div className={`m-journey--embed--light ${theme}`}>
    <div className="embebed-map">
      <Iframe
        url={`${process.env.REACT_APP_SITE +
          mapUrl}&journeyMap=true&countryIso=&maskSql=${maskSql}`}
      />
      <a
        href={process.env.REACT_APP_SITE + btnUrl}
        target="_blank"
        rel="noopener noreferrer"
        // data-step={currentStep}
        // data-journey={currentJourney}
        className="btn-check-it"
      >
        View on map
      </a>
    </div>
    <article className="side-bar">
      <div className="wrapper">
        <article>
          <DangerousHTML html={aside} />
          <section className="m-legend" id="legendView">
            <div className="wrapper">
              <header className="m-legend__header">
                <h2 className="title">Legend</h2>
                <span className="btn-minimize">Legend****</span>
              </header>
            </div>
          </section>

          <footer>
            <p>INSIGHTS PROVIDED BY CONSERVATION INTERNATIONAL</p>
          </footer>
        </article>
      </div>
    </article>
  </div>
);

export default JourneyEmbed;

// <div className="m-legend__content">
// <ul className="m-legend__list">
//   <li className="drag-items " data-id="96">
//     <header>
//       <span className="draggable-icon">
//         {/* <svg><use xlink: href="#icon-drag"></use></svg> */}
//       </span>
//       <h3>Coffee (Arabica)</h3>
//       <div className="actions">
//         <button
//           type="button"
//           className="btn-remove"
//           data-layerid="96"
//         >
//           {/* <svg className="icon"><use xlink: href="#icon-remove"></use></svg> */}
//         </button>
//         <button
//           type="button"
//           className="btn-action btn-visibility false"
//           data-id="96"
//         >
//           {/* <svg><use xlink: href="#icon-visibilityon"></use></svg> */}
//         </button>
//       </div>
//     </header>
//     <span className="units">
//       Harvested area (square kilometers)
//     </span>
//     <div className="m-legend__choropleth">
//       <div className="wrapper-item">
//         <span className="min-val">1</span>
//         <span className="max-val">5</span>
//         <div className="item" />
//       </div>
//       <div className="wrapper-item">
//         <span className="min-val" />
//         <span className="max-val">10</span>
//         <div className="item" />
//       </div>
//       <div className="wrapper-item">
//         <span className="min-val" />
//         <span className="max-val">25</span>
//         <div className="item">></div>
//       </div>
//       <div className="wrapper-item">
//         <span className="min-val" />
//         <span className="max-val">50</span>
//         <div className="item" />
//       </div>
//       <div className="wrapper-item">
//         <span className="min-val" />
//         <span className="max-val">100</span>
//         <div className="item" />
//       </div>
//       <div className="wrapper-item">
//         <span className="min-val" />
//         <span className="max-val">&gt;100</span>
//         <div className="item" />
//       </div>
//     </div>
//   </li>
// </ul>
// </div> LEGEND
