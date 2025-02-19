import { Router } from "express";
import { getMarks, createOrUpdateMarks, getMarksById, updateMarks, deleteMarks } from "../controllers/marks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createOrUpdateMarks).get(verifyJWT, getMarks);
router.route("/:id").get(verifyJWT, getMarksById);
router.route("/:id").put(verifyJWT, updateMarks);
router.route("/:id").delete(verifyJWT, deleteMarks);

export default router;