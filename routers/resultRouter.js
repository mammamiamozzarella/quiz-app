import { Router } from "express";
const router = Router();

import { createQuizResult } from "../controllers/quizResultController.js";

router.route("/").post(createQuizResult);

export default router;
