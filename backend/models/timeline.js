// models/Timeline.js
import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // Add historical character information
  historicalCharacter: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // Store any predefined responses or knowledge base for the chat
    chatContext: {
      type: [String],
      default: []
    }
  },
  timelineData: [{
    year: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['text', '3d', 'map', 'quote'],
      required: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  }]
}, {
  timestamps: true
});

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;