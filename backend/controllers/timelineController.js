// controllers/timelineController.js
import Timeline from '../models/Timeline.js';

// @desc    Get all timelines
// @route   GET /api/timelines
// @access  Public
export const getAllTimelines = async (req, res) => {
  try {
    const timelines = await Timeline.find({}).select('title description category');
    res.json(timelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single timeline by ID
// @route   GET /api/timelines/:id
// @access  Public
export const getTimelineById = async (req, res) => {
  try {
    const timeline = await Timeline.findById(req.params.id);
    if (timeline) {
      res.json(timeline);
    } else {
      res.status(404).json({ message: 'Timeline not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};