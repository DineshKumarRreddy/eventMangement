import { EVENT_NOT_FOUND_MESSAGE } from "../../../constants.js";
import {
  addEventToUserQueues,
  updateUser,
} from "../../services/authService.js";
import {
  createEventsService,
  deleteEventService,
  getAllEventsService,
  updateEventsService,
  getEventByIdService,
} from "../../services/eventSevices.js";
import { sendMailsToUsers } from "../../utils/sendMailsToUsers.js";
import { EMAppError } from "../../utils/utils/appError.js";
import handleCatchAsync from "../../utils/utils/handleCatchAsync.js";

export const getAllEvenetController = handleCatchAsync(
  async (req, res, next) => {
    const events = await getAllEventsService();
    res.status(200).json({
      events,
    });
  }
);

export const getEventByIdController = handleCatchAsync(
  async (req, res, next) => {
    const event = await getEventByIdService(req?.params?.eventId);
    res.status(200).json({
      event,
    });
  }
);

export const createEvenetController = handleCatchAsync(
  async (req, res, next) => {
    const event = await createEventsService(req.user.id, req.body);
    await updateUser(req.user.id, { events: event._id });
    await addEventToUserQueues(event._id);
    res.status(201).json({
      event,
    });
    sendMailsToUsers();
  }
);

export const updateEvenetController = handleCatchAsync(
  async (req, res, next) => {
    const eventId = req.params.eventId;
    const event = await updateEventsService(eventId, req.body);
    if (!event) return next(new EMAppError(EVENT_NOT_FOUND_MESSAGE, 404));
    res.status(200).json({
      event,
    });
  }
);

export const deleteEvenetController = handleCatchAsync(
  async (req, res, next) => {
    const { eventId } = req.params;
    const event = await deleteEventService(eventId);
    if (!event) return next(new EMAppError(EVENT_NOT_FOUND_MESSAGE, 404));
    res.status(201).json({
      message: "event deleted",
    });
  }
);
