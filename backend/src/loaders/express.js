import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";
import config from "../config";

export default ({ app }) => {
  app.use(cors());

  app.use(bodyParser.json());

  app.use(config.api.prefix, routes());

  app.get("/", (req, res) => res.send("backend API"));

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
