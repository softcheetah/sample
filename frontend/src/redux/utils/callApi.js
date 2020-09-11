import axios from "axios";
import config from "../../config";

const callApi = async (method, url, data = {}) => {
  const headers = { };
  const token = window.localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await axios({
    baseURL: config.server,
    method,
    url,
    headers,
    data,
  });
  return response.data;
};

export default callApi;
