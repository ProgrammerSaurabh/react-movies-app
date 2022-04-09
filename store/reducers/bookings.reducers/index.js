import { types } from "../../actions/types";

export const INITIAL_BOOKINGS = {
  loading: false,
  error: null,
  bookings: [],
  booking: null,
};

export const bookingReducer = (state = INITIAL_BOOKINGS, { type, payload }) => {
  switch (type) {
    case types.BOOKING_LOADING:
      return { ...state, loading: true };

    case types.LOAD_BOOKING_SUCCESS:
      return { ...state, loading: false, booking: payload, error: null };

    case types.STORE_BOOKING_ERROR:
    case types.LOAD_BOOKING_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};
