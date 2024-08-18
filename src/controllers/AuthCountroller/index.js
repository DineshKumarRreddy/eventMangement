import {
  INCORRECT_EMAIL_OR_PASSWORD,
  LOGIN_SUCCESS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "../../../constants.js";
import {
  authLogInService,
  authSignUpService,
  fetchUserService,
} from "../../services/authService.js";
import { EMAppError } from "../../utils/utils/appError.js";
import handleCatchAsync from "../../utils/utils/handleCatchAsync.js";

export const singUpController = handleCatchAsync(async (req, res, next) => {
  const user = await authSignUpService(req.body);
  res.status(201).json({
    user,
  });
});

export const loginController = handleCatchAsync(async (req, res, next) => {
  const token = await authLogInService(req.body);
  if (!token) return next(new EMAppError(INCORRECT_EMAIL_OR_PASSWORD, 400));
  res.status(200).json({
    message: LOGIN_SUCCESS_MESSAGE,
    token,
  });
});

export const getUserController = handleCatchAsync(async (req, res, next) => {
  const user = await fetchUserService(req.user.id);
  if (!user) return next(new EMAppError(USER_NOT_FOUND_MESSAGE, 404));
  res.status(200).json({ user });
});
