import { createReducer } from '../../utils';
import { LOAD_JOURNEY_INDEX, SET_CURRENT_STEP } from './actions';

const initialState = {
  currentStep: 0,
};

export default createReducer(initialState)({
  [LOAD_JOURNEY_INDEX.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload.data[0],
  }),
  [SET_CURRENT_STEP]: (state, { payload }) => ({
    ...state,
    currentState: payload,
  }),
});
