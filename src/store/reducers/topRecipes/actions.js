import * as types from "./types";

export const fetchPending = () => ({ type: types.fetchPending });
export const fetchSuccess = (data) => ({
  type: types.fetchSuccess,
  payload: { data },
});
export const fetchFailure = (error) => ({
  type: types.fetchFailure,
  payload: { error },
});
