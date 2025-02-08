import { Router } from "express";
import { addBranch, getAllBranches, updateBranch, deleteBranch } from "../controllers/branch.controller.js";

const router = Router();

router.route("/").post(addBranch).get(getAllBranches);
router.route("/:id").delete(deleteBranch).put(updateBranch);

export default router;