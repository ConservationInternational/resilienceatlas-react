import { createReducer } from '../../utils';
import { LOGIN } from './actions';

const initialState = {
  /* reducer shape here */
};

export default createReducer(initialState)({
  [LOGIN]: (state, action) => state,
});
