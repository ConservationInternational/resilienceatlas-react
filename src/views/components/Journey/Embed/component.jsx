import React, { useEffect } from 'react';
import DangerousHTML from 'react-dangerous-html';
import Iframe from 'react-iframe';
import Legend from '@components/Legend';
import qs from 'qs';

const Embed = ({
  theme,
  mapUrl,
  btnUrl,
  maskSql,
  aside,
  currentStep,
  currentJourney,
  countries,
  countryName,
  setActiveLayer,
}) => {
  useEffect(() => {
    const mapString = mapUrl.split('?')[1];
    const mapData = qs.parse(mapString, { parameterLimit: 1 });
    const layerData = JSON.parse(mapData.layers);
    const layerDataIds = layerData.map(l => l.id);
    setActiveLayer(layerDataIds);
  }, []);
  const countryInfo = Object.values(countries).find(
    c => c.name.toLowerCase() === countryName.toLowerCase(),
  );

  return (
    <div className={`m-journey--embed--light ${theme}`}>
      <div className="embebed-map">
        <Iframe
          src={`${process.env.REACT_APP_SITE +
            mapUrl}&journeyMap=true&countryIso=
            ${countryInfo.iso}&maskSql=${maskSql}`}
        />
        <a
          href={process.env.REACT_APP_SITE + btnUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-step={currentStep}
          data-journey={currentJourney}
          className="btn-check-it"
        >
          View on map
        </a>
      </div>
      <article className="side-bar">
        <div className="wrapper">
          <article>
            <DangerousHTML html={aside} />
            <Legend />
            <footer>
              <p>INSIGHTS PROVIDED BY CONSERVATION INTERNATIONAL</p>
            </footer>
          </article>
        </div>
      </article>
    </div>
  );
};

export default Embed;
