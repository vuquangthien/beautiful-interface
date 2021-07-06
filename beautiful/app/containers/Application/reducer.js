/* eslint-disable no-console */
/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { APP_FETCH_SUCCEEDED, APP_FETCH_FAILED } from './constants';

export const initialState = {
  appData: [],
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const ProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case APP_FETCH_SUCCEEDED:
        console.log(action.payload);
        draft.appData = action.payload;
        break;
      case APP_FETCH_FAILED:
        draft.message = action.message;
        break;
      default:
    }
  });

export default ProviderReducer;
