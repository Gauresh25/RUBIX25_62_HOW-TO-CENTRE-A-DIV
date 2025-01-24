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
  // War Events
  {
    id: 1,
    title: "Meerut Uprising Begins",
    description: "The first major uprising began in Meerut when sepoys refused to use the new Enfield rifle cartridges and broke into open revolt on May 10, 1857.",
    position: [28.9845, 77.7064],
    category: "War",
  },
  {
    id: 2,
    title: "Siege of Delhi",
    description: "Rebels seized Delhi and declared the elderly Mughal emperor Bahadur Shah Zafar as the Emperor of Hindustan. British forces later laid siege to the city from June to September 1857.",
    position: [28.6562, 77.2410], // Red Fort coordinates
    category: "War",
  },
  {
    id: 3,
    title: "Barrackpore Mutiny",
    description: "Site of Mangal Pandey's action against his officers on March 29, 1857, considered one of the first acts of rebellion.",
    position: [22.7644, 88.3669],
    category: "War",
  },
  {
    id: 4,
    title: "Siege of Lucknow",
    description: "British forces were besieged at the Residency in Lucknow from July to November 1857. The siege became a symbol of British resistance.",
    position: [26.8467, 80.9462],
    category: "War",
  },
  {
    id: 5,
    title: "Battle of Jhansi",
    description: "Rani Lakshmibai led her forces against the British in defense of Jhansi from March to April 1858.",
    position: [25.4484, 78.5685],
    category: "War",
  },

  // Political Events
  {
    id: 6,
    title: "Proclamation of Bahadur Shah Zafar",
    description: "The last Mughal emperor was proclaimed the Emperor of Hindustan by the rebels on May 11, 1857.",
    position: [28.6562, 77.2410], // Red Fort coordinates
    category: "Politics",
  },
  {
    id: 7,
    title: "Kanpur Proclamation",
    description: "Nana Sahib issued proclamations calling for unified Hindu-Muslim resistance against British rule in June 1857.",
    position: [26.4499, 80.3319],
    category: "Politics",
  },

  // Art/Cultural Events
  {
    id: 8,
    title: "Last Mughal Court Poetry",
    description: "The last known mushairas (poetic symposiums) were held in Delhi's Red Fort, featuring poets like Ghalib and Zauq, before the fall of the Mughal dynasty.",
    position: [28.6562, 77.2410],
    category: "Art",
  },
  {
    id: 9,
    title: "Company Painting School",
    description: "Artists in Calcutta (now Kolkata) created detailed paintings documenting the events of 1857, combining European and Indian artistic styles.",
    position: [22.5726, 88.3639],
    category: "Art",
  },
  {
    id: 10,
    title: "Awadh Court Arts",
    description: "The last examples of Awadh court art were created in Lucknow before the deposition of Wajid Ali Shah, showing the culmination of the Nawabi artistic tradition.",
    position: [26.8467, 80.9462],
    category: "Art",
  },
  {
    id: 11,
    title: "August Kranti - Quit India Movement",
    description: "On August 8, 1942, Mahatma Gandhi delivered his historic 'Do or Die' speech at Gowalia Tank Maidan (now August Kranti Maidan) in Bombay, launching the Quit India Movement. The next day, the Congress leadership was arrested, sparking nationwide protests.",
    position: [18.9607, 72.8124], // Gowalia Tank Maidan/August Kranti Maidan coordinates
    category: "Politics",
  },
  {
    id: 12,
    title: "Pearl Harbor Attack",
    description: "On December 7, 1941, Japanese forces launched a surprise attack on the US naval base at Pearl Harbor, Hawaii, leading to America's entry into World War II.",
    position: [21.3649, -157.9739], // Pearl Harbor coordinates
    category: "War",
  },
  {
    id: 13,
    title: "Battle of Stalingrad",
    description: "From August 1942 to February 1943, one of the deadliest battles in history was fought in Stalingrad (now Volgograd), marking a turning point in WW2 as Soviet forces defeated Nazi Germany.",
    position: [48.7080, 44.5133], // Volgograd/Stalingrad coordinates
    category: "War",
  },
  {
    id: 14,
    title: "D-Day Normandy Landings",
    description: "On June 6, 1944, Allied forces launched the largest seaborne invasion in history on the beaches of Normandy, France, beginning the liberation of Western Europe.",
    position: [49.4144, -0.8322], // Omaha Beach coordinates
    category: "War",
  },
  {
    id: 15,
    title: "Hiroshima Atomic Bombing",
    description: "On August 6, 1945, the first atomic bomb used in warfare was dropped on Hiroshima, Japan, leading to unprecedented destruction and eventually Japan's surrender, ending WW2.",
    position: [34.3853, 132.4553], // Hiroshima Peace Memorial coordinates
    category: "War",
  }
];

export default eventsData;