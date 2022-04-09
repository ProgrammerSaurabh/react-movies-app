import { takeLatest } from "redux-saga/effects";
import { types } from "../actions/types";
import { loadBooking, storeBooking } from "./bookings.saga";
import { loadMovies, loadMovie } from "./movies.saga";

export function* rootSaga() {
  yield takeLatest(types.LOAD_MOVIES, loadMovies);
  yield takeLatest(types.LOAD_MOVIE, loadMovie);

  yield takeLatest(types.LOAD_BOOKING, loadBooking);
  yield takeLatest(types.STORE_BOOKING, storeBooking);
}
