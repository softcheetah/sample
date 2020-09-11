import callApi from "../utils/callApi";
import { Types } from "../actions/user";

const apis = {};

apis[Types.GET_SELF] = async () => callApi(
  "GET",
  "/user/self"
);

apis[Types.SEARCH_USER] = async () => callApi(
  "GET",
  "/user/search"
);

apis[Types.GET_USER] = async action => callApi(
  "GET",
  `/user/get/${action.userId}`
);

apis[Types.UPDATE_USER] = async action => callApi(
  "PUT",
  `/user/update/${action.userId}`,
  action.values
);

apis[Types.CREATE_USER] = async action => callApi(
  "POST",
  "/user/create",
  action.values
);

export default apis;
