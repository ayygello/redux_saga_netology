import { put, retry, spawn, takeEvery } from 'redux-saga/effects';
import {
  fetchServiceFailure,
  fetchServiceSuccess,
  fetchSingleServiceFailure,
  fetchSingleServiceSuccess,
} from '../actions/actionCreators';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SINGLE_SERVICE_REQUEST,
} from '../actions/actionTypes';
import { fetchServices, fetchSingleService } from '../api';

// worker
function* handleFetchServicesSaga() {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(retryCount, retryDelay, fetchServices);
    yield put(fetchServiceSuccess(data));
  } catch (e) {
    yield put(fetchServiceFailure(e.message));
  }
}

// watcher
function* watchFetchServicesSaga() {
  yield takeEvery(FETCH_SERVICES_REQUEST, handleFetchServicesSaga);
}

// worker
function* handleFetchSingleServiceSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      fetchSingleService,
      action.payload.id
    );
    yield put(fetchSingleServiceSuccess(data));
  } catch (e) {
    yield put(fetchSingleServiceFailure(e.message));
  }
}

// watcher
function* watchFetchSingleServiceSaga() {
  yield takeEvery(FETCH_SINGLE_SERVICE_REQUEST, handleFetchSingleServiceSaga);
}

export default function* saga() {
  yield spawn(watchFetchServicesSaga);
  yield spawn(watchFetchSingleServiceSaga);
}
