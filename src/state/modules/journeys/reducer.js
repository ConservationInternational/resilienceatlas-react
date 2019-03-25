import { createReducer } from '../../utils';
import { LOAD_PAGE_INDEX } from './actions';

const initialState = {
  pageIndex: [],
};

export default createReducer(initialState)({
  [LOAD_PAGE_INDEX.SUCCESS]: (state, { payload }) => ({
    ...state,
    pageIndex: payload,
  }),
});
