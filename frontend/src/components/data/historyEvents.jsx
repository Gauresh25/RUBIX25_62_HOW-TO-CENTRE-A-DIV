// src/data/historyEvents.js

/**
 * @typedef {Object} HistoricalEvent
 * @property {number} id - Unique identifier for the event
 * @property {string} title - Title of the historical event
 * @property {string} description - Description of the event
 * @property {[number, number]} position - Latitude and longitude coordinates
 * @property {string} category - Category of the event
 */

const eventsData = [
  // War
  {
    id: 1,
    title: "Normandy Landings (D-Day)",
    description:
      "Allied forces landed on the beaches of Normandy, France on June 6, 1944, marking a pivotal turn in World War II.",
    position: [49.4144, -0.8322],
    category: "War",
  },
  
  // Art
  {
    id: 2,
    title: "Mona Lisa Installation",
    description: 
      "Leonardo da Vinci's Mona Lisa was first installed at the Louvre Museum in 1797.",
    position: [48.8606, 2.3376],
    category: "Art",
  },

  // Add more events as needed...
];

export default eventsData;