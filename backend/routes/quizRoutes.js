import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	getLeaderBoardDetails,
	saveQuizDetails,
} from "../controllers/quizController.js";
const router = express.Router();

router.route("/save").post(protect, saveQuizDetails);
router.route("/leaderboard").get(getLeaderBoardDetails);
export default router;
