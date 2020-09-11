import callApi from "../utils/callApi";
import { Types } from "../actions/auth";

const apis = {};

apis[Types.CHECK_TOKEN] = async () => callApi(
  "GET",
  "/auth/check-token"
);

apis[Types.SIGN_IN] = async action => callApi(
  "POST",
  "/auth/sign-in",
  {
    email    : action.email,
    password : action.password
  }
);

apis[Types.REQUEST_RESET_PASSWORD] = async action => callApi(
  "POST",
  "/auth/password/request-reset",
  {
    email: action.email,
  }
);

apis[Types.RESET_PASSWORD] = async action => callApi(
  "POST",
  "/auth/password/reset",
  {
    token    : action.token,
    password : action.password
  }
);

export default apis;
