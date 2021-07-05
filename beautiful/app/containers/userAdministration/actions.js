/* eslint-disable prettier/prettier */
import { USER_DATA_FETCH_REQUESTED, UPDATE_USER_DATA } from './constants';

export function getUserData() {
  return {
    type: USER_DATA_FETCH_REQUESTED,
  };
}

export function updateUserData(newData) {
  return {
    type: UPDATE_USER_DATA,
    payload: newData,
  };
}
