import { createReducer } from '../../utils';
import { LOAD_JOURNEY_INDEX } from './actions';

const initialState = {};

export default createReducer(initialState)({
  [LOAD_JOURNEY_INDEX.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload.data[0],
  }),
});
