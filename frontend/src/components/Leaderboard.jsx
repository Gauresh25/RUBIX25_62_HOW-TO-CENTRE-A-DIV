/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const LeaderboardTable = ({ data }) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="w-[100px]">Rank</TableHead>
				<TableHead>Name</TableHead>
				<TableHead className="text-right">Score</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{data.map((entry) => (
				<TableRow key={entry.id}>
					<TableCell className="font-medium">{entry.rank}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell className="text-right">{entry.score}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

export default function Leaderboard() {
	const [activeTab, setActiveTab] = useState("indian");
	const [indianData, setIndianData] = useState([]);
	const [euorepeanData, setEuorepeanData] = useState([]);

	const getData = () => {
		axios
			.get("/api/quiz/leaderboard")
			.then((res) => {
				const data = res.data;
				let indrank = 0;
				let indlastscore = -1;
				let india = [];
				let eurank = 0;
				let eurolastscore = -1;
				let euro = [];
				data.forEach((obj) => {
					if (obj.type == "indian") {
						if (obj.score != indlastscore) {
							indrank = indrank + 1;
						}
						indlastscore = obj.score;
						india.push({
							score: obj.score,
							name: obj.user_id?.name,
							rank: indrank,
						});
					} else if (obj.type == "european") {
						if (obj.score != eurolastscore) {
							eurank = eurank + 1;
						}
						eurolastscore = obj.score;
						euro.push({
							score: obj.score,
							name: obj.user_id?.name,
							rank: eurank,
						});
					}
				});
				setIndianData(india);
				setEuorepeanData(euro);
			})
			.catch((err) => {
				console.log("error");
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex flex-row py-20">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						History quiz Leaderboard
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs
						value={activeTab}
						onValueChange={(value) => setActiveTab(value)}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="indian">Indian</TabsTrigger>
							<TabsTrigger value="european">European</TabsTrigger>
						</TabsList>
						<TabsContent value="indian">
							<LeaderboardTable data={indianData} />
						</TabsContent>
						<TabsContent value="european">
							<LeaderboardTable data={euorepeanData} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
