import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { EMAppError } from "../utils/utils/appError.js";
import {
  ACCESS_DENIED_MESSAGE,
  AUTHENTICATION_REQUIRED_MESSAGE,
  AUTHORIZATION_HEADER,
  BEARER,
  BEARER_NULL_TOKEN,
  SALT_ROUNDS,
  SINGLE_SPACE,
  USER_NOT_FOUND_WITH_TOKEN,
} from "../../constants.js";

const hashPassword = async (plainPassword) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

const authenticateUser = ({ role, id }) => {
  const payload = { id, role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

export const isUserAthenticated = async (req, res, next) => {
  let authToken;
  const token = req?.headers?.[AUTHORIZATION_HEADER];
  if (!token || token?.toLowerCase() === BEARER_NULL_TOKEN)
    return next(new EMAppError(AUTHENTICATION_REQUIRED_MESSAGE, 401));
  if (token && token.startsWith(BEARER)) {
    authToken = token.split(SINGLE_SPACE)[1];
  }
  if (!authToken)
    return next(new EMAppError(AUTHENTICATION_REQUIRED_MESSAGE, 401));
  const authUser = await promisify(jwt.verify)(
    authToken,
    process.env.JWT_SECRET
  );
  const user = await Users.findById(authUser.id);
  if (!user) return next(new EMAppError(USER_NOT_FOUND_WITH_TOKEN, 404));
  req.user = authUser;
  next();
};

export const isProtected = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) return next();
  next(new EMAppError(ACCESS_DENIED_MESSAGE, 403));
};

export const authSignUpService = async (userReq) => {
  const hashedPassword = await hashPassword(userReq?.password);
  const user = await Users.create({
    ...userReq,
    password: hashedPassword,
  });
  return user;
};

export const authLogInService = async (userLogin) => {
  const { email, password } = userLogin;
  const user = await Users.findOne({ email });
  if (user) {
    const match = await comparePassword(password, user?.password);
    if (match) {
      const token = authenticateUser({ id: user._id, role: user.role });
      return token;
    }
  }
  return null;
};

export const fetchUsers = async () => {
  const users = await Users.find();
  return users;
};

export const fetchUserService = async (id) => {
  const user = await Users.findById(id);
  return user;
};

export const updateUser = async (id, reqPayload) => {
  const { events, otherUserProps } = reqPayload;
  const user = await Users.findByIdAndUpdate(
    id,
    {
      ...otherUserProps,
      ...(events ? { $push: { events } } : {}),
    },
    { new: true }
  );
  return user;
};

export const addEventToUserQueues = async (eventId) => {
  await Users.updateMany({ role: "user" }, { $push: { events: eventId } });
  return;
};
