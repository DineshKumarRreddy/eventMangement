import {
  INVALID_USER_PROPERTIES,
  PASSWORD_IS_MANDATORY,
  PASSWORD_MIN_LENGTH_ERROR,
} from "../../../constants.js";
import { catchInvalidProps } from "../sharedUtils.js";
import { EMAppError } from "../utils/appError.js";

const userSignUp = {
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  dateOfBirth: true,
  createdAt: true,
  isActive: true,
  role: true,
};

const logInAuth = {
  email: true,
  password: true,
};

export const signUpValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return next(new EMAppError(PASSWORD_IS_MANDATORY, 400));
  }
  if (password?.length < 6) {
    return next(new EMAppError(PASSWORD_MIN_LENGTH_ERROR, 400));
  }
  const inValidProps = catchInvalidProps(req.body, userSignUp);
  if (inValidProps?.length) {
    return next(
      new EMAppError(
        INVALID_USER_PROPERTIES.replace("${0}", inValidProps.join(", ")),
        400
      )
    );
  }
  next();
};

export const logInValidation = (req, res, next) => {
  const inValidProps = catchInvalidProps(req.body, logInAuth);
  if (inValidProps?.length) {
    return next(
      new EMAppError(
        INVALID_USER_PROPERTIES.replace("${0}", inValidProps.join(", ")),
        400
      )
    );
  }
  next();
};
