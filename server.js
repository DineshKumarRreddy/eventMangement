import { configDotenv } from "dotenv";
import mongoose from "mongoose";

process.on(UNCAUGHT_EXCEPTION, (err) => {
  console.log(UNCAUGHT_REJECTION_MESSAGE);
  console.log(err.name, err.message);
  process.exit(1);
});
configDotenv();

import app from "./src/eventManagementApp.js";
import {
  EVENT_MANAGEMENT_DOWN_MESSAGE,
  MISSING_ENV_VARS_MESSAGE,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_USER_NAME,
  SERVER_CONNECTED_SUCCESS_MESSAGE,
  SERVER_RUNNING_SUCESS_MESSAGE,
  UNCAUGHT_EXCEPTION,
  UNCAUGHT_REJECTION_MESSAGE,
  UNHANDLED_REJECTION,
  UNHANDLED_REJECTION_MESSAGE,
} from "./constants.js";

const { DB_URL, USER_NAME, PASSWORD } = process.env;

if (!DB_URL || !USER_NAME || !PASSWORD) {
  console.error(MISSING_ENV_VARS_MESSAGE);
  process.exit(1);
}

const DB_CONNECTION = DB_URL.replace(
  PLACEHOLDER_USER_NAME,
  encodeURIComponent(USER_NAME)
).replace(PLACEHOLDER_PASSWORD, encodeURIComponent(PASSWORD));

mongoose.connect(DB_CONNECTION).then(() => {
  console.log(SERVER_CONNECTED_SUCCESS_MESSAGE);
});

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(EVENT_MANAGEMENT_DOWN_MESSAGE, err);
  }
  console.log(SERVER_RUNNING_SUCESS_MESSAGE.replace("${0}", process.env.PORT));
});

process.on(UNHANDLED_REJECTION, (err) => {
  console.log(UNHANDLED_REJECTION_MESSAGE);
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
