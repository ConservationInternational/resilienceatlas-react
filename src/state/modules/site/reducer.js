import { createReducer } from '../../utils';
import { LOAD } from './actions';

const initialState = {
  /* reducer shape here */
};

export default createReducer(initialState)({
  [LOAD.SUCCESS]: (state, action) => state,
});
