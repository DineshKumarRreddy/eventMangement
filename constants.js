const USER = "user";
const ORGANIZER = "organizer";
const ADMIN = "admin";
const FAIL = "fail";
const ERROR = "error";
const INCORRECT_EMAIL_OR_PASSWORD = "Incorrect email or password";
const PASSWORD_IS_MANDATORY = "Password is mandatory";
const PASSWORD_MIN_LENGTH_ERROR = "Password must be at least 8 characters long";
const INVALID_USER_PROPERTIES = "Invalid properties: ${0}";
const LOGIN_SUCCESS_MESSAGE = "Logged in successfully";
const USER_NOT_FOUND_MESSAGE = "No user found with the provided credentials";
const AUTHORIZATION_HEADER = "authorization";
const BEARER_NULL_TOKEN = "bearer null";
const AUTHENTICATION_REQUIRED_MESSAGE =
  "Authentication required: Please log in to access this resource";
const USER_NOT_FOUND_WITH_TOKEN = "No user found with the provided token";
const ACCESS_DENIED_MESSAGE =
  "Access denied: You do not have permission to perform this action";
const BEARER = "Bearer";
const SINGLE_SPACE = " ";
const SALT_ROUNDS = 10;
const ASTERISK = "*";
const URL_NOT_FOUND = "can't find this ${0} on this server";
const EVENT_NOT_FOUND_MESSAGE = "No event found with the provided credentials";
const UNCAUGHT_EXCEPTION = "uncaughtException";
const UNCAUGHT_REJECTION_MESSAGE = "UNCAUGHT REJECTION 🚨 Shutting down...";
const MISSING_ENV_VARS_MESSAGE = "Missing required environment variables";
const PLACEHOLDER_USER_NAME = "<USER_NAME>";
const PLACEHOLDER_PASSWORD = "<PASSWORD>";
const SERVER_CONNECTED_SUCCESS_MESSAGE = "Server connected successfully";
const EVENT_MANAGEMENT_DOWN_MESSAGE =
  "Event management is currently down. Please try again later.";
const UNHANDLED_REJECTION = "unhandledRejection";
const UNHANDLED_REJECTION_MESSAGE = "UNHANDLED REJECTION 🚨 Shutting down...";
const SERVER_RUNNING_SUCESS_MESSAGE =
  "Event management is running successfully on PORT ${0}.";
const CLIENT_ERROR_PREFIX = "4";
const INTERNAL_SERVER_ERROR_CODE = 500;
const DUPLICATE_KEY_ERROR_CODE = 11000;
const CAST_ERROR_NAME = "casterror";
const VALIDATION_ERROR_NAME = "validationerror";
const UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred.";
const VALIDATION_ERROR_MESSAGE = "Validation error occurred.";
const DUPLICATE_KEY_ERROR_MESSAGE = "Duplicate key error: ${0} already exists.";
const INVALID_CAST_ERROR_MESSAGE = "Invalid ${0}: ${1} is not valid.";
const USER_ACCEPTANCE_EVENT_HTMLCONTENT = `
<html>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50;">New Events Added to Your Queue</h2>
      <p>Hello,</p>
      <p>We wanted to let you know that new events have been added to your queue.</p>
      <p>Please log in to your account and check your dashboard for more details.</p>
      <p>
        <a 
          href=""
          style="
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
          "
        >
          Login to Dashboard
        </a>
      </p>
      <p>Thank you,</p>
      <p>The Event Management Team</p>
    </div>
  </body>
</html>
`;

export {
  USER,
  ORGANIZER,
  ADMIN,
  FAIL,
  ERROR,
  INCORRECT_EMAIL_OR_PASSWORD,
  PASSWORD_IS_MANDATORY,
  PASSWORD_MIN_LENGTH_ERROR,
  INVALID_USER_PROPERTIES,
  LOGIN_SUCCESS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  AUTHORIZATION_HEADER,
  BEARER_NULL_TOKEN,
  AUTHENTICATION_REQUIRED_MESSAGE,
  USER_NOT_FOUND_WITH_TOKEN,
  ACCESS_DENIED_MESSAGE,
  BEARER,
  SINGLE_SPACE,
  SALT_ROUNDS,
  ASTERISK,
  URL_NOT_FOUND,
  EVENT_NOT_FOUND_MESSAGE,
  UNCAUGHT_EXCEPTION,
  UNCAUGHT_REJECTION_MESSAGE,
  MISSING_ENV_VARS_MESSAGE,
  PLACEHOLDER_USER_NAME,
  PLACEHOLDER_PASSWORD,
  SERVER_CONNECTED_SUCCESS_MESSAGE,
  EVENT_MANAGEMENT_DOWN_MESSAGE,
  UNHANDLED_REJECTION,
  UNHANDLED_REJECTION_MESSAGE,
  SERVER_RUNNING_SUCESS_MESSAGE,
  CLIENT_ERROR_PREFIX,
  INTERNAL_SERVER_ERROR_CODE,
  DUPLICATE_KEY_ERROR_CODE,
  CAST_ERROR_NAME,
  VALIDATION_ERROR_NAME,
  UNEXPECTED_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  DUPLICATE_KEY_ERROR_MESSAGE,
  INVALID_CAST_ERROR_MESSAGE,
  USER_ACCEPTANCE_EVENT_HTMLCONTENT,
};
