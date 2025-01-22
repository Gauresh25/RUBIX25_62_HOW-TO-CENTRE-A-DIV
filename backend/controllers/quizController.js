import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Quiz from "../models/quizModel.js";

export const saveQuizDetails = asyncHandler(async (req, res) => {
	try {
		const user_id = req.user._id;
		const score = req.body.score;
		const type = req.body.type;
		const newQuizrow = new Quiz({
			user_id,
			score,
			type,
		});
		const newRes = await newQuizrow.save();
		res.json(newRes);
	} catch (err) {
		res.status(500).json({
			message: err,
		});
	}
});
export const getLeaderBoardDetails = asyncHandler(async (req, res) => {
	const scores = await Quiz.find()
		.populate("user_id", "name")
		.sort({ score: -1 });
	return res.json(scores);
});
