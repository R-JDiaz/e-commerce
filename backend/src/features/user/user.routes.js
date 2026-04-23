import express from "express";
import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import { validateUpdateUser, validateUserId } from "./user.validation.js";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", validateRequest(validateUserId, "params"), getUserController);
router.put("/:id", validateRequest(validateUserId, "params"), validateRequest(validateUpdateUser), updateUserController);
router.delete("/:id", validateRequest(validateUserId, "params"), deleteUserController);

export default router;
