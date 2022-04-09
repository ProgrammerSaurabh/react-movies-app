import { put } from "redux-saga/effects";
import { types } from "../actions/types";

import axios from "axios";

export function* loadMovies() {
  try {
    const { data } = yield axios.get(`http://10.0.2.2:3001/movies`);

    yield put({ type: types.LOAD_MOVIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_MOVIES_ERROR, error });
  }
}

export function* loadMovie({ payload }) {
  try {
    const { data } = yield axios.get(`http://10.0.2.2:3001/movies/${payload}`);

    yield put({ type: types.LOAD_MOVIE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_MOVIE_ERROR, error });
  }
}
