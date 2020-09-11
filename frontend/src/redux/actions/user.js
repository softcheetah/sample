import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getSelf    : [],
  searchUser : [],
  getUser    : ["userId"],
  updateUser : ["userId", "values"],
  createUser : ["values"],
}, { prefix: "user_" });

export { Types, Creators };
