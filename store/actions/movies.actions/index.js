import { types } from "../types";

export const loading = () => {
  return { type: types.MOVIE_LOADING };
};

export const loadMovies = () => {
  return { type: types.LOAD_MOVIES };
};

export const loadMovie = (payload) => {
  return { type: types.LOAD_MOVIE, payload };
};

export const searchMovies = (payload) => {
  return { type: types.SEARCH_MOVIES, payload };
};
