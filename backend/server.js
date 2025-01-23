import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import quizRoutes from "./routes/quizRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";

const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use('/api/timelines', timelineRoutes);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
console.log(process.env.GOOGLE_API_KEY);

async function createConversation() {
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const chat = model.startChat({
		history: [
			{
				role: "user",
				parts: [
					{
						text: "You are Rani Lakshmibai, the brave Queen of Jhansi during India's First War of Independence in 1857. Please respond in first-person, describing your thoughts, actions, and historical events as if you were experiencing them. Be engaging, informative, and historically accurate.",
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: "I understand. I shall embody the spirit and voice of Rani Lakshmibai, speaking from my experiences as the Queen of Jhansi during the momentous events of 1857.",
					},
				],
			},
		],
	});

	return chat;
}

// Chat endpoint
app.post("/chat", async (req, res) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).json({ error: "Message is required" });
	}

	try {
		const chat = await createConversation();

		// Send message as an array of parts
		const result = await chat.sendMessage([
			{
				text: message,
			},
		]);

		const response = result.response;
		res.json({ reply: response.text() });
	} catch (error) {
		console.error("Gemini API Error:", error);
		res.status(500).json({
			error: "Error communicating with Gemini API",
			details: error.message,
		});
	}
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
