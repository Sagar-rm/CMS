import { Router } from "express";
import { examController } from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, examController.addExamResult).get(verifyJWT, examController.getAllExams);
// router.route("/:id").get(verifyJWT, examController.getExamById);
// router.route("/:id").put(verifyJWT, examController.updateExam);
// router.route("/:id").delete(verifyJWT, examController.deleteExam);

export default router;
