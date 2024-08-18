import Events from "../models/eventModel.js";

export const getAllEventsService = async () => {
  const events = await Events.find().populate({
    path: "organizer",
    select: "-events",
  });
  return events;
};

export const getEventByIdService = async (id) => {
  const event = await Events.findById(id).populate({
    path: "organizer",
    select: "-events",
  });
  return event;
};

export const createEventsService = async (organizerId, eventsPayload) => {
  const event = await Events.create({
    ...eventsPayload,
    organizer: organizerId,
  });
  return event;
};

export const updateEventsService = async (id, eventsPayload) => {
  const event = await Events.findByIdAndUpdate(
    id,
    { ...eventsPayload },
    { new: true, runValidators: false }
  );
  return event;
};

export const deleteEventService = async (eventId) => {
  const event = await Events.findByIdAndDelete(eventId);
  return event;
};
