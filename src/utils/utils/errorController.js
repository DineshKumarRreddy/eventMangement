import {
  CAST_ERROR_NAME,
  DUPLICATE_KEY_ERROR_CODE,
  DUPLICATE_KEY_ERROR_MESSAGE,
  ERROR,
  FAIL,
  INTERNAL_SERVER_ERROR_CODE,
  INVALID_CAST_ERROR_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  VALIDATION_ERROR_NAME,
} from "../../../constants.js";

const runtimeServerException = (err) => {
  let error = {
    message: err?.message || UNEXPECTED_ERROR_MESSAGE,
    status: err?.status || ERROR,
    statusCode: err?.statusCode || INTERNAL_SERVER_ERROR_CODE,
  };

  const castError = (err) => {
    if (err?.name?.toLowerCase() === CAST_ERROR_NAME) {
      error.statusCode = 400;
      error.status = FAIL;
      error.message = INVALID_CAST_ERROR_MESSAGE.replace(
        "${0}",
        err.kind
      ).replace("${1}", err.value);
    }
  };

  const error11000 = (err) => {
    if (err?.code === DUPLICATE_KEY_ERROR_CODE) {
      const keys = Object.keys(err?.keyValue).join(", ");
      error.statusCode = 400;
      error.status = FAIL;
      error.message = DUPLICATE_KEY_ERROR_MESSAGE.replace("${0}", keys);
    }
  };

  const validationError = (err) => {
    if (err?.name?.toLowerCase() === VALIDATION_ERROR_NAME) {
      error.statusCode = 400;
      error.status = FAIL;
      error.message = err.message || VALIDATION_ERROR_MESSAGE;
    }
  };

  castError(err);
  error11000(err);
  validationError(err);

  return error;
};

const errorController = (err, req, res, next) => {
  const error = runtimeServerException(err);
  return res.status(error?.statusCode).json({
    status: error?.status,
    message: error?.message,
  });
};

export default errorController;
