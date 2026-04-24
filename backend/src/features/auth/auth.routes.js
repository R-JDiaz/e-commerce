import express from "express";
import { authMiddleware } from "../../common/middleware/auth.js";
import { validateRequest } from "../../common/validation/request.js";
import { loginController, logoutController, meController, refreshController, registerController } from "./auth.controller.js";
import { validateLogin, validateRegister } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validateRequest(validateRegister), registerController);
router.post("/login", validateRequest(validateLogin), loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, meController);
router.post("/refresh", refreshController);

export default router;
