/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { appFetchSucceeded, appFetchFailed } from './actions';
import { APP_FETCH_REQUESTED } from './constants';
// import { makeSelectAppData } from './selectors';

// Lấy danh sách ứng dụng
export function* getAppData() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `http://172.16.100.76:8888/qtud/api/v1/system/search?page=1&size=25`;
  console.log(requestURL);

  try {
    // Call our request helper (see 'utils/request')
    const feedback = yield call(request, requestURL);
    console.log(feedback);
    const appData = feedback.data.data;
    yield put(appFetchSucceeded(appData));
  } catch (err) {
    yield put(appFetchFailed(err));
  }
}

export default function* watchGetAppData() {
  yield takeLatest(APP_FETCH_REQUESTED, getAppData);
}
