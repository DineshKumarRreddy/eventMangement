import express from "express";
import { isUserAthenticated, isProtected } from "../services/authService.js";
import { ADMIN, ORGANIZER } from "../../constants.js";
import {
  createEvenetController,
  deleteEvenetController,
  getAllEvenetController,
  updateEvenetController,
  getEventByIdController,
} from "../controllers/eventController/index.js";
import {
  createEventValidations,
  updateEventValidations,
} from "../utils/requesrValidations/eventRequestValidation.js";

const router = express.Router();
router.use(isUserAthenticated);

router
  .route("/")
  .get(isProtected([ADMIN]), getAllEvenetController)
  .post(
    isProtected([ORGANIZER, ADMIN]),
    createEventValidations,
    createEvenetController
  );
router
  .route("/:eventId")
  .get(getEventByIdController)
  .put(isProtected([ADMIN]), updateEventValidations, updateEvenetController)
  .delete(isProtected([ADMIN]), deleteEvenetController);

export default router;
