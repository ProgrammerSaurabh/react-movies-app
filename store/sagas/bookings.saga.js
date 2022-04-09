import { put } from "redux-saga/effects";
import { types } from "../actions/types";

import axios from "axios";

export function* storeBooking({ payload }) {
  try {
    const { data } = yield axios.post(
      `http://10.0.2.2:3001/transactions`,
      payload.data
    );

    yield put({ type: types.STORE_BOOKING_SUCCESS });

    if (payload?.onSuccess && typeof payload?.onSuccess === "function") {
      payload?.onSuccess(data.id);
    }
  } catch (error) {
    yield put({ type: types.STORE_BOOKING_ERROR, error });
  }
}

export function* loadBooking({ payload }) {
  try {
    const { data } = yield axios.get(
      `http://10.0.2.2:3001/transactions/${payload}`
    );

    yield put({ type: types.LOAD_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_BOOKING_ERROR, error });
  }
}
