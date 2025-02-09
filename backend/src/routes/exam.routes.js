import { Router } from "express";
import { examController } from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, examController.addExamResult).get(verifyJWT, examController.getAllExams);
// router.route("/:id").get(verifyJWT, examController.getExamById);
router.route("/:id").put(verifyJWT, examController.updateExamResult);
router.route("/:id").delete(verifyJWT, examController.deleteExamResult);

export default router;
