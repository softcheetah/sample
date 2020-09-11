import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  updateState: ["payload"],
}, { prefix: "global_" });

export { Types, Creators };
