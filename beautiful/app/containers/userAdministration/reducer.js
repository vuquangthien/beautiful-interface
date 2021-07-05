/* eslint-disable no-console */
/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import {
  USER_DATA_FETCH_SUCCEEDED,
  USER_DATA_FETCH_FAILED,
  UPDATE_USER_DATA_SUCCEEDED,
  UPDATE_USER_DATA_FAILED,
} from './constants';

export const initialState = {
  data: [],
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const ProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_DATA_FETCH_SUCCEEDED:
        draft.data = action.payload;
        break;
      case USER_DATA_FETCH_FAILED:
        draft.message = action.message;
        break;
      case UPDATE_USER_DATA_SUCCEEDED:
        draft.data = action.payload;
        break;
      case UPDATE_USER_DATA_FAILED:
        draft.message = action.message;
        break;
      default:
    }
  });

export default ProviderReducer;
