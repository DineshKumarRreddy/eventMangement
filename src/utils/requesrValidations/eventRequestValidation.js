import { catchInvalidProps } from "../sharedUtils.js";

const event = {
  name: true,
  date: true,
  time: true,
  description: true,
};
const organizer = { organizer: true };

export const createEventValidations = (req, res, next) => {
  const inValidProps = catchInvalidProps(req.body, event);
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

export const updateEventValidations = (req, res, next) => {
  const inValidProps = catchInvalidProps(req.body, {
    ...event,
    ...organizer,
  });
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
