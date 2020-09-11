import { createReducer } from "reduxsauce";
import { Types } from "../actions/auth";
import { success, failure } from "../utils/action";

// Initial State
const initialState = {
  user: null,
};

// window.localStorage.setItem("token", action.payload.token);
// window.localStorage.removeItem("token");

/* Handlers */
const signIn = (state, action) => ({
  ...state,
  user: action.payload.user,
});

const signOut = state => ({
  ...state,
  user: null
});

// map action types to reducer functions
export const handlers = {
  [success(Types.CHECK_TOKEN)]    : signIn,
  [failure(Types.CHECK_TOKEN)]    : signOut,
  [success(Types.SIGN_IN)]        : signIn,
  [success(Types.RESET_PASSWORD)] : signIn,
  [success(Types.SIGN_OUT)]       : signOut,
};

// Export Reducer
export default createReducer(initialState, handlers);
