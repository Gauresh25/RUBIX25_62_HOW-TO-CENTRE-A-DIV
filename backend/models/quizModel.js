import mongoose, { Schema } from "mongoose";

const quizModel = mongoose.Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

const Quiz = mongoose.model("Quiz", quizModel);
export default Quiz;
