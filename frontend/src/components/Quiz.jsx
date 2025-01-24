"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
// import { Map } from "../assets/Map.jpg";

const indianHistoryQuestions = [
	{
		id: 1,
		text: "In which year did India gain independence from British rule?",
		options: ["1945", "1947", "1950", "1952"],
		correctAnswer: 1,
	},
	{
		id: 2,
		text: "Who is known as the 'Father of the Nation' in India?",
		options: [
			"Jawaharlal Nehru",
			"Sardar Patel",
			"Mahatma Gandhi",
			"Subhas Chandra Bose",
		],
		correctAnswer: 2,
	},
	{
		id: 3,
		text: "The Maurya Empire was founded by which ruler?",
		options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Chanakya"],
		correctAnswer: 1,
	},
	{
		id: 4,
		text: "Which Mughal emperor built the Taj Mahal?",
		options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
		correctAnswer: 2,
	},
	{
		id: 5,
		text: "The Battle of Plassey was fought in which year?",
		options: ["1757", "1764", "1772", "1784"],
		correctAnswer: 0,
	},
	{
		id: 6,
		text: "Who was the first woman Prime Minister of India?",
		options: [
			"Sarojini Naidu",
			"Indira Gandhi",
			"Sonia Gandhi",
			"Pratibha Patil",
		],
		correctAnswer: 1,
	},
	{
		id: 7,
		text: "The Harappan Civilization is also known as:",
		options: [
			"Vedic Civilization",
			"Mauryan Civilization",
			"Indus Valley Civilization",
			"Gupta Civilization",
		],
		correctAnswer: 2,
	},
	{
		id: 8,
		text: "Which Indian leader is known for his role in the Salt March?",
		options: [
			"Bhagat Singh",
			"Mahatma Gandhi",
			"Jawaharlal Nehru",
			"Sardar Patel",
		],
		correctAnswer: 1,
	},
	{
		id: 9,
		text: "The Gupta Empire is often referred to as the Golden Age of India. Who founded this empire?",
		options: ["Samudragupta", "Chandragupta I", "Skandagupta", "Kumaragupta"],
		correctAnswer: 1,
	},
	{
		id: 10,
		text: "Which of these was NOT a part of the Indian Independence Movement?",
		options: [
			"Quit India Movement",
			"Non-Cooperation Movement",
			"Sepoy Mutiny",
			"Green Revolution",
		],
		correctAnswer: 3,
	},
];

const europeanHistoryQuestions = [
	{
		id: 1,
		text: "In which year did World War II end?",
		options: ["1943", "1945", "1947", "1950"],
		correctAnswer: 1,
	},
	{
		id: 2,
		text: "Who was the first President of the French Fifth Republic?",
		options: [
			"Charles de Gaulle",
			"Georges Pompidou",
			"Valéry Giscard d'Estaing",
			"François Mitterrand",
		],
		correctAnswer: 0,
	},
	{
		id: 3,
		text: "The French Revolution began in which year?",
		options: ["1789", "1799", "1804", "1776"],
		correctAnswer: 0,
	},
	{
		id: 4,
		text: "Which European country was ruled by fascist dictator Francisco Franco from 1939 to 1975?",
		options: ["Italy", "Germany", "Spain", "Portugal"],
		correctAnswer: 2,
	},
	{
		id: 5,
		text: "Who wrote 'The Prince', a 16th-century political treatise?",
		options: ["Voltaire", "Rousseau", "Machiavelli", "Hobbes"],
		correctAnswer: 2,
	},
	{
		id: 6,
		text: "The Industrial Revolution began in which country?",
		options: ["France", "Germany", "United States", "Great Britain"],
		correctAnswer: 3,
	},
	{
		id: 7,
		text: "Which treaty ended World War I?",
		options: [
			"Treaty of Versailles",
			"Treaty of Westphalia",
			"Treaty of Utrecht",
			"Treaty of Brest-Litovsk",
		],
		correctAnswer: 0,
	},
	{
		id: 8,
		text: "Who was the last Tsar of Russia?",
		options: [
			"Nicholas II",
			"Alexander III",
			"Peter the Great",
			"Ivan the Terrible",
		],
		correctAnswer: 0,
	},
	{
		id: 9,
		text: "The Renaissance period is generally considered to have begun in which country?",
		options: ["France", "England", "Italy", "Spain"],
		correctAnswer: 2,
	},
	{
		id: 10,
		text: "Which event is often cited as the start of World War I?",
		options: [
			"Russian Revolution",
			"Assassination of Archduke Franz Ferdinand",
			"Battle of Verdun",
			"Signing of the Treaty of Versailles",
		],
		correctAnswer: 1,
	},
];

export default function HistoryQuiz() {
	const [genre, setGenre] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);

	const questions =
		genre === "indian" ? indianHistoryQuestions : europeanHistoryQuestions;

	const handleGenreSelect = (selectedGenre) => {
		setGenre(selectedGenre);
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResult(false);
	};

	const handleAnswer = (answerIndex) => {
		setSelectedAnswer(answerIndex);
	};

	const handleNextQuestion = () => {
		if (selectedAnswer === questions[currentQuestion].correctAnswer) {
			setScore(score + 1);
		}

		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer(null);
		} else {
			saveResults();
			setShowResult(true);
		}
	};

	const saveResults = () => {
		const payload = {};
		payload.score = score;
		payload.type = genre;
		console.log(payload);
		axios
			.post("/api/quiz/save", payload)
			.then((response) => {
				console.log("Response:", response.data);
				toast.success(
					"Huarryyy ! You have successfully completed the quiz ! Check leaderboard"
				);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Something went wrong ! Please try again");
			});
	};

	const restartQuiz = () => {
		setGenre(null);
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResult(false);
	};

	if (!genre) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-[#DFD7BF] shadow-black ">
				{/* <img src={Map} /> */}
				<Card className="w-[500px]">
					<CardHeader>
						<CardTitle>Choose a Quiz Genre</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<Button
							onClick={() => handleGenreSelect("indian")}
							className="w-full bg-[#3F2305] hover:bg-[#CBA35C]"
						>
							Indian History
						</Button>
						<Button
							onClick={() => handleGenreSelect("european")}
							className="w-full  bg-[#3F2305] hover:bg-[#CBA35C]"
						>
							European History
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (showResult) {
		return (
			<div>
				<div className="flex items-center justify-center min-h-screen bg-[#DFD7BF]">
					<Card className="w-[500px]">
						<CardHeader>
							<CardTitle>Quiz Results</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold text-center">
								Your score: {score} out of {questions.length}
							</p>
						</CardContent>
						<CardFooter>
							<Button
								onClick={restartQuiz}
								className="w-full  bg-[#3F2305] hover:bg-[#CBA35C]"
							>
								Restart Quiz
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		);
	}

	const question = questions[currentQuestion];

	return (
		<div className="flex items-center justify-center min-h-screen bg-[#DFD7BF]">
			<Card className="w-[500px]">
				<CardHeader>
					<CardTitle>
						{genre === "indian" ? "Indian" : "European"} History Quiz
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">{question.text}</p>
					<RadioGroup
						key={currentQuestion}
						value={selectedAnswer?.toString()}
						onValueChange={(value) => handleAnswer(Number.parseInt(value))}
					>
						{question.options.map((option, index) => (
							<div key={index} className="flex items-center space-x-2">
								<RadioGroupItem
									value={index.toString()}
									id={`option-${index}`}
								/>
								<Label htmlFor={`option-${index}`}>{option}</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
				<CardFooter>
					<Button
						onClick={handleNextQuestion}
						disabled={selectedAnswer === null}
						className="w-full  bg-[#3F2305] hover:bg-[#CBA35C]"
					>
						{currentQuestion === questions.length - 1 ? "Finish" : "Next"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
