import { types } from "../types";

export const loading = () => {
  return { type: types.BOOKING_LOADING };
};

export const loadBooking = (payload) => {
  return { type: types.LOAD_BOOKING, payload };
};

export const storeBooking = (payload) => {
  return { type: types.STORE_BOOKING, payload };
};
