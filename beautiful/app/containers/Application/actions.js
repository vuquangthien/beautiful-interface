/* eslint-disable prettier/prettier */
import {
  APP_FETCH_REQUESTED,
  APP_FETCH_SUCCEEDED,
  APP_FETCH_FAILED,
} from './constants';

// Gọi api lấy dữ liệu app
export function appFetchRequested() {
  return {
    type: APP_FETCH_REQUESTED,
  };
}

// Lấy dữ liệu thành công
export function appFetchSucceeded(data) {
  return {
    type: APP_FETCH_SUCCEEDED,
    payload: data,
  };
}

// Lấy dữ liệu thất bại
export function appFetchFailed(error) {
  return {
    type: APP_FETCH_FAILED,
    payload: error,
  };
}
