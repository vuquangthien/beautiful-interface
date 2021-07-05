/* eslint-disable prettier/prettier */
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  USER_DATA_FETCH_SUCCEEDED,
  USER_DATA_FETCH_FAILED,
  USER_DATA_FETCH_REQUESTED,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCEEDED,
  UPDATE_USER_DATA_FAILED,
} from './constants';

function* getUserData() {
  try {
    const demoData = [
      { id: 1, col1: 'Hello', col2: 'World' },
      { id: 2, col1: 'XGrid', col2: 'is Awesome' },
      { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
      { id: 4, col1: 'Hello', col2: 'World' },
      { id: 5, col1: 'XGrid', col2: 'is Awesome' },
      { id: 6, col1: 'Material-UI', col2: 'is Amazing' },
      { id: 7, col1: 'Hello', col2: 'World' },
      { id: 8, col1: 'XGrid', col2: 'is Awesome' },
      { id: 9, col1: 'Material-UI', col2: 'is Amazing' },
      { id: 10, col1: 'Hello', col2: 'World' },
      { id: 11, col1: 'XGrid', col2: 'is Awesome' },
      { id: 12, col1: 'Material-UI', col2: 'is Amazing' },
    ];
    yield put({ type: USER_DATA_FETCH_SUCCEEDED, payload: demoData });
  } catch (e) {
    yield put({ type: USER_DATA_FETCH_FAILED, message: e.message });
  }
}

function* watchGetUserData() {
  yield takeLatest(USER_DATA_FETCH_REQUESTED, getUserData);
}

function* updateUserData(newData) {
  try {
    yield put({ type: UPDATE_USER_DATA_SUCCEEDED, payload: newData });
  } catch (e) {
    yield put({ type: UPDATE_USER_DATA_FAILED, message: e.message });
  }
}

function* watchUpdateUserData() {
  yield takeLatest(UPDATE_USER_DATA, updateUserData);
}

export default function* rootSaga() {
  yield all([watchGetUserData(), watchUpdateUserData()]);
}
