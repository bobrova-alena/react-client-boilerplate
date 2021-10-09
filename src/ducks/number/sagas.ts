import { all, takeEvery, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { NumberRequest, INumberResponse } from './transport';
import * as api from './api';
import { GET_NUMBER, POST_NUMBER, setNumber } from './slice';

function* GetNumericData() {
  try {
    const response = (yield api.getNumber()) as INumberResponse;
    yield put(setNumber(response));
  } catch (e) {
    console.log(e);
  }
}

function* PostNumericData(action: PayloadAction<NumberRequest>) {
  try {
    yield api.postNumber(action.payload);
    yield put(setNumber(action.payload));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootCounterSaga(): unknown {
  yield all([
    yield takeEvery(GET_NUMBER.toString(), GetNumericData),
    yield takeEvery(POST_NUMBER.toString(), PostNumericData),
  ]);
}
