import { normalize } from 'normalizr';

export default store => next => action => {
  const { payload, error, meta: { schema, ...restMeta } = {} } = action;

  if (schema && payload && !error) {
    const { data, meta } = payload;
    const normalized = normalize(data, schema);

    action = {
      ...action,
      payload: normalized,
      meta: { ...meta, ...restMeta },
    };
  }

  return next(action);
};
