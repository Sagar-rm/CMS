import { Router } from "express";
import { gradeController } from "../controllers/grade.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, gradeController.addGrade).get(verifyJWT, gradeController.getAllGrades);
// router.route("/:id").get(verifyJWT, gradeController.getGradeById);
router.route("/:id").put(verifyJWT, gradeController.updateGrade);
router.route("/:id").delete(verifyJWT, gradeController.deleteGrade);

export default router;
