import { createReducer } from '../../utils';
import { LOAD } from './actions';

const initialState = {
  has_analysis: true,
  name: '',
  subdomain: '',
  color: '#0089cc',
  header_theme: '',
  lat: NaN,
  lng: NaN,
  zoom_level: NaN,
  link_text: null,
  link_url: null,
  header_color: null,
  logo_url: '',

  loading: false,
  loaded: false,
  error: null,
};

export default createReducer(initialState)({
  [LOAD.REQUEST]: state => ({
    ...state,
    error: null,
    loading: true,
  }),

  [LOAD.SUCCESS]: (state, { payload }) => {
    const data = payload.entities.site_scopes[payload.result];

    return {
      ...state,
      id: data.id,
      has_analysis: data.subdomain ? data.has_analysis : true,
      name: data.name || '',
      subdomain: data.subdomain || '',
      color: data.color || '#0089cc',
      header_theme: data.header_theme || '',
      lat: data.latitude || NaN,
      lng: data.longitude || NaN,
      zoom_level: data.zoom_level || NaN,
      link_text: data.linkback_text || null,
      link_url: data.linkback_url || null,
      header_color: data.header_color || null,
      logo_url: data.logo_url || '/images/logo-ci.png',

      loading: false,
      loaded: true,
    };
  },

  [LOAD.FAIL]: (state, { error }) => ({
    ...initialState,
    logo_url: '/images/logo-ci.png',
    loading: false,
    error,
  }),
});
