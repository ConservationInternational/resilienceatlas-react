import { normalize } from 'normalizr';

export default store => next => action => {
  const {
    payload,
    error,
    meta: { schema, includedSchema, ...restMeta } = {},
  } = action;

  if (schema && payload && !error) {
    const { data, included: includedData, meta } = payload;
    const normalized = normalize(data, schema);
    let included;

    if (includedSchema && includedData) {
      included = normalize(includedData, includedSchema);
    }

    action = {
      ...action,
      payload: normalized,
      included,
      meta: { ...meta, ...restMeta },
    };
  }

  return next(action);
};
