import L from 'leaflet';
import { PORT, isProd } from '../state/utils/api';
import { getRouterParam } from './routeParams';

/**
 * @param  {string} key key to sort on
 * @param  {boolean} desc=false to sort in descending order
 *
 * @returns {function} to be inserted in .sort method
 */
export const sortBy = (key, desc = false) => (a, b) => {
  if (a[key] > b[key]) return desc ? -1 : 1;
  if (a[key] < b[key]) return desc ? 1 : -1;
  return 0;
};

/**
 * @param  {function} onClick click handler to be bound to element
 *
 * @returns  {object} object of properties to semantically hanlde click
 */
export const clickable = onClick => ({
  onClick,
  tabIndex: 0,
  role: 'button',
  onKeyPress: e => (e.keyCode === 13 || e.charCode === 13) && onClick(),
});

/**
 * @param  {array} array input array
 *
 * @returns  {array} array of only unique values
 */
export const uniq = array => Array.from(new Set(array));

/**
 * Deep merges two objets.
 * @param  {Object} object destination object
 * @param  {Object} source source obejct
 *
 * @returns {Object} new object
 */
export const merge = (object, source) => {
  if (object === source) return object;

  const newValue = {
    ...object,
    ...source,
  };

  Object.entries(source).forEach(([key, value]) => {
    if (object[key] && typeof object[key] === 'object') {
      newValue[key] = merge(object[key], value);
    } else {
      newValue[key] = value;
    }
  });

  return newValue;
};

export const swapLatLng = geojson =>
  L.geoJSON(geojson, {
    coordsToLatLng: coords => new L.LatLng(coords[0], coords[1], coords[2]),
  }).toGeoJSON();

export const formatNumber = ({
  value,
  locale = 'en',
  formatFrom = 10000,
  ...rest
}) => {
  if (value < formatFrom) {
    return new Intl.NumberFormat(locale, rest).format(value);
  }

  const intl = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...rest,
  });

  if (value >= 1e9) {
    return `${intl.format(value / 1e9)}B`;
  }

  if (value >= 1e6) {
    return `${intl.format(value / 1e6)}M`;
  }

  if (value >= 1e3) {
    return `${intl.format(value / 1e3)}K`;
  }

  return 0;
};

export const getSubdomain = () => {
  const host = isProd
    ? PORT.replace(/(^http(s?):\/\/)|(\.com)$/g, '')
    : `localhost:${window.location.port}`;

  if (window.location.host === '52.7.28.202') return false;

  let subdomain = window.location.host.split('.')[0].replace(host, '');

  if (!subdomain || subdomain === 'www') {
    subdomain = getRouterParam('site_scope');
  }

  return subdomain;
};

/**
 * @type {String} runs once on app init.
 */
export const subdomain = getSubdomain();
