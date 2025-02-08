import { Router } from "express";
import { addBranch, getAllBranches, updateBranch, deleteBranch } from "../controllers/branch.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, addBranch).get(getAllBranches);
router.route("/:id").delete(verifyJWT, deleteBranch).put(verifyJWT, updateBranch);

export default router;