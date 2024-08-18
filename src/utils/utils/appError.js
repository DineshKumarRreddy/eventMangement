import {
  CLIENT_ERROR_PREFIX,
  ERROR,
  FAIL,
  INTERNAL_SERVER_ERROR_CODE,
} from "../../../constants.js";

export class EMAppError extends Error {
  constructor(message, statusCode = INTERNAL_SERVER_ERROR_CODE) {
    super(message);
    this.status = `${statusCode}`.startsWith(CLIENT_ERROR_PREFIX)
      ? FAIL
      : ERROR;
    this.statusCode = statusCode;
    this.operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
