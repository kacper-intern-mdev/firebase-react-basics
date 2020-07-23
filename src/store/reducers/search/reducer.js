import * as types from "./types";

const initialState = {
  query: "",
  data: [],
  users: [],
  pending: false,
  error: null,
  open: false,
  next: null,
  group: "all",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.open:
      return { ...state, open: true };
    case types.close:
      return { ...state, open: false };
    case types.fetchPending:
      return { ...state, pending: true };
    case types.fetchSuccess:
      return {
        ...state,
        pending: false,
        data: payload.data.recipes.data,
        next: payload.data.recipes.next,
        users: payload.data.users,
      };
    case types.fetchFailure:
      return { ...state, pending: false, error: payload.error };
    case types.setGroup:
      return {
        ...state,
        group: payload.group,
      };
    case types.clear:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
