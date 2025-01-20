import { Router } from "express";
import {facultyController} from "../controllers/user.controller.js";
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
  facultyController.register
);

router.route("/login").post(facultyController.login);
router.route("/refresh-token").post(facultyController.refresh);
router.route("/me").post(verifyJWT,facultyController.getCurrentUser )
router.route("/logout").post(verifyJWT, facultyController.logout);

export default router