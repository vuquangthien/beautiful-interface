/* eslint-disable prettier/prettier */
import produce from 'immer';

import { CREATE_VIEW_CONFIG, UPDATE_VIEW_CONFIG } from './constants';

export const initialState = {
  config: [],
};

/* eslint-disable default-case, no-param-reassign */
const configProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_VIEW_CONFIG:
        draft.config.push(action.config);
        break;
      case UPDATE_VIEW_CONFIG:
        draft.config = action.config;
        break;
    }
  });

export default configProviderReducer;
