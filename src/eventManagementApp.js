import express from "express";
import authRouter from "./Routes/authRoute.js";
import eventsRouter from "./Routes/eventRoute.js";
import errorController from "./utils/utils/errorController.js";
import { EMAppError } from "./utils/utils/appError.js";
import { ASTERISK, URL_NOT_FOUND } from "../constants.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);

app.use("/api/v1/events", eventsRouter);

app.all(ASTERISK, (req, res, next) => {
  next(new EMAppError(URL_NOT_FOUND.replace("${0}", req.originalUrl), 404));
});

app.use(errorController);

export default app;
