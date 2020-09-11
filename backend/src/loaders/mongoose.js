import mongoose from "mongoose";
import config from "../config";

export default async () => {
  const connection = await mongoose.connect(config.databaseUrl, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  });
  return connection.connection.db;
};
