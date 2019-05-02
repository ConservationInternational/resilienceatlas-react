export const SET_DRAWING = 'map / SET_DRAWING';
export const SET_GEOJSON = 'map / SET_GEOJSON';

export const setDrawing = payload => ({
  type: SET_DRAWING,
  payload,
});

export const setGeojson = payload => ({
  type: SET_GEOJSON,
  payload,
});
