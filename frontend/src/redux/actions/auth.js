import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  signIn               : ["email", "password"],
  requestResetPassword : ["email"],
  resetPassword        : ["token", "password"],
  signOut              : [],
  checkToken           : [],
}, { prefix: "auth_" });

export { Types, Creators };
