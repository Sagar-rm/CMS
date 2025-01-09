import { Router } from "express";
import {studentController} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profile",
      maxCount: 1
    }
  ]),
  studentController.register
);

router.route("/login").post(studentController.login);
router.route("/refresh-token").post(studentController.refresh);
router.route("/me").post(verifyJWT,studentController.getCurrentUser )
router.route("/logout").post(verifyJWT, studentController.logout);

export default router