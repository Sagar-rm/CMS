import { Router } from "express";
import { getMarks, createMarks, getMarksById, updateMarks, deleteMarks } from "../controllers/marks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createMarks).get(verifyJWT, getMarks);
router.route("/:id").get(verifyJWT, getMarksById);
router.route("/:id").put(verifyJWT, updateMarks);
router.route("/:id").delete(verifyJWT, deleteMarks);

export default router;
