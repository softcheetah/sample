import { createReducer } from "reduxsauce";
import { Types } from "../actions/user";
import { success, request } from "../utils/action";

// Initial State
const initialState = {
  self  : null,
  users : []
};

/* Handlers */
const getSelf = (state, action) => ({
  ...state,
  self: action.payload.user
});

const searchUser = (state, action) => ({
  ...state,
  users: action.payload.users
});

const resetUser = state => ({
  ...state,
  editingUser: null
});

const getUser = (state, action) => ({
  ...state,
  editingUser: action.payload.user
});

// map action types to reducer functions
export const handlers = {
  [success(Types.GET_SELF)]    : getSelf,
  [success(Types.SEARCH_USER)] : searchUser,
  [request(Types.GET_USER)]    : resetUser,
  [success(Types.GET_USER)]    : getUser,
};

// Export Reducer
export default createReducer(initialState, handlers);
