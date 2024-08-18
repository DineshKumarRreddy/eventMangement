import express from "express";
import {
  singUpController,
  loginController,
  getUserController,
} from "../controllers/AuthCountroller/index.js";
import { isUserAthenticated } from "../services/authService.js";
import {
  signUpValidation,
  logInValidation,
} from "../utils/requesrValidations/authRequestValidation.js";

const router = express.Router();

router.post("/signUp", signUpValidation, singUpController);
router.post("/logIn", logInValidation, loginController);

router.use(isUserAthenticated);

router.get("/me", getUserController);

export default router;
