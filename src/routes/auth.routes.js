import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { schemaValidator } from "../middlewares/schema.middleware.js";
import { loginUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.post("/login", schemaValidator(loginUserSchema) , authController.login);

export default router;
