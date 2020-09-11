import { Router } from "express";
import middlewares from "../middlewares";
import controller from "../../controllers/user";
import { USER_PERMISSION } from "../../constants";

const route = Router();

export default (app) => {
  app.use("/user", route);

  route.get("/self",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controller.getSelf);

  route.post("/create",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.hasPermission([USER_PERMISSION.ADMIN]),
    controller.createUser);

  route.put("/update/:userId",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.hasPermission([USER_PERMISSION.ADMIN]),
    controller.updateUser);

  route.get("/get/:userId",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.hasPermission([USER_PERMISSION.ADMIN]),
    controller.getUser);

  route.get("/search",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.hasPermission([USER_PERMISSION.ADMIN]),
    controller.searchUser);
};
