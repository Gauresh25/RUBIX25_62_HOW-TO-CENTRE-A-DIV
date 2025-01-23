// routes/timelineRoutes.js
import express from "express";
import { getAllTimelines, getTimelineById } from "../controllers/timelineController.js";

const router = express.Router();

router.route("/").get(getAllTimelines);
router.route("/:id").get(getTimelineById);

export default router;