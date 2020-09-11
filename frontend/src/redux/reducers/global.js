import { createReducer } from "reduxsauce";
import { Types } from "../actions/global";

// Initial State
const initialState = {
  status: {},
};

/* Handlers */
const updateState = (state, action) => ({
  ...state,
  ...action.payload,
});

// map action types to reducer functions
export const handlers = {
  [Types.UPDATE_STATE]: updateState,
};

// Export Reducer
export default createReducer(initialState, handlers);
