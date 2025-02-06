import { Router } from "express";
import { subjectController } from "../controllers/subject.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, subjectController.addSubject).get(subjectController.getAllSubjects);
// router.route("/:id").get(subjectController.getSubjectById);
// router.route("/:id").put(verifyJWT, subjectController.updateSubject);
// router.route("/:id").delete(verifyJWT, subjectController.deleteSubject);

export default router;