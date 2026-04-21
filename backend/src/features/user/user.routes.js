import express from "express";
import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller.js";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;