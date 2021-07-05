/* eslint-disable prettier/prettier */
import {
  CREATE_VIEW_CONFIG,
  UPDATE_VIEW_CONFIG,
  USER_DATA_FETCH_REQUESTED,
} from './constants';

export function createViewConfig(viewConfig) {
  return {
    type: CREATE_VIEW_CONFIG,
    config: viewConfig,
  };
}

export function updateViewConfig(viewConfig) {
  return {
    type: UPDATE_VIEW_CONFIG,
    config: viewConfig,
  };
}

export function getUserData() {
  return {
    type: USER_DATA_FETCH_REQUESTED,
  };
}
