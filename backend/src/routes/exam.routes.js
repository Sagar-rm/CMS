import { Router } from "express";
import { createExam, getExams, getExamById, updateExam, deleteExam } from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createExam).get(verifyJWT, getExams);
router.route("/:id").get(verifyJWT, getExamById);
router.route("/:id").put(verifyJWT, updateExam);
router.route("/:id").delete(verifyJWT, deleteExam);

// // ✅ Add CIE Exam Routes   
// router.route("/:id/cie")
//     .post(verifyJWT, examController.addCIEExam);  // Add CIE Exam

// router.route("/:id/cie/:cieId")
//     .put(verifyJWT, examController.updateCIEExam)  // Update CIE Exam
//     .delete(verifyJWT, examController.deleteCIEExam);  // Delete CIE Exam

export default router;
