import { Router } from "express";
import middlewares from "../middlewares";
import controller from "../../controllers/auth";

const route = Router();

export default (app) => {
  app.use("/auth", route);

  route.post("/password/request-reset", controller.requestResetPassword);
  route.post("/password/reset", controller.resetPassword);
  route.post("/sign-in", controller.signIn);
  route.get("/check-token",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controller.checkToken);
};
