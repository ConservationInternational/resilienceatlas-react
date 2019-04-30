import { createReducer } from '../../utils';
import { SET_DRAWING } from './actions';

const initialState = {
  drawing: false,
};

export default createReducer(initialState)({
  [SET_DRAWING]: (state, { payload }) => ({
    ...state,
    drawing: payload,
  }),
});
