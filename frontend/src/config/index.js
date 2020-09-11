const config = {
  local: {
    server: "http://localhost:5005/v1",
  },
  development: {
    server: "https://api-dev............./v1",
  },
  production: {
    server: "https://api............./v1",
  },
};

const REACT_APP_STAGE = process.env.REACT_APP_STAGE || "development";

export default {
  ...config[REACT_APP_STAGE],
  REACT_APP_STAGE,
};
