import { types } from "../../actions/types";

export const INITIAL_MOVIES = {
  loading: false,
  error: null,
  movies: [],
  filteredMovies: [],
  movie: null,
};

export const movieReducer = (state = INITIAL_MOVIES, { type, payload }) => {
  switch (type) {
    case types.MOVIE_LOADING:
      return { ...state, loading: true };

    case types.LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: payload,
        filteredMovies: [],
        error: null,
        movie: null,
      };

    case types.LOAD_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredMovies: [],
        movie: payload,
        error: null,
      };

    case types.SEARCH_MOVIES:
      let filteredMovies = [];

      if (payload) {
        const search = new RegExp(payload, "i");
        filteredMovies = [...state.movies]
          .filter((movie) => movie.title.match(search))
          .sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
      }

      return { ...state, filteredMovies };

    case types.LOAD_MOVIES_ERROR:
    case types.LOAD_MOVIE_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};
