import { combineReducers } from "redux";
import { bookingReducer } from "./bookings.reducers";
import { movieReducer } from "./movies.reducers";

const rootReducer = combineReducers({
  movies: movieReducer,
  bookings: bookingReducer,
});

export default rootReducer;
