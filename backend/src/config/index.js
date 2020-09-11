import dotenv from "dotenv";

if (process.env.DOT_ENV) {
  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("Couldn't find .env file");
  }
}

const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  development: {
    frontend: "https://.............."
  },
  common: {
    supportEmail   : "support@..............",
    databaseUrl    : process.env.DB_URI,
    jwtSecret      : process.env.JWT_SECRET,
    sendgridAPIKey : process.env.SENDGRID_API_KEY,
    jwt            : { expiresIn: "10h" },
    logs           : {
      level: process.env.LOG_LEVEL || "silly"
    },
    port : process.env.PORT || 5005,
    api  : {
      prefix: "/v1"
    }
  }
};

export default {
  ...config.common,
  ...config[NODE_ENV],
  NODE_ENV,
};
