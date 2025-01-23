import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from './Timeline'; // your existing Timeline component

const TimelineSelection = () => {
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTimelines();
  }, []);

  const fetchTimelines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/timelines');
      setTimelines(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch timelines');
      setLoading(false);
    }
  };

  const fetchTimelineData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/timelines/${id}`);
      setSelectedTimeline(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch timeline data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] w-full">
      <div className="w-full px-4 py-8">
        <h1 className="text-4xl text-center mb-12 text-[#8B4513] font-koulen border-2 border-[#8B4513] mx-auto py-4">
          Historical Timelines
        </h1>
        
        {!selectedTimeline ? (
          <div className="w-full grid grid-cols-1 gap-8 p-4">
            {timelines.map((timeline) => (
              <div
                key={timeline._id}
                className="w-full bg-white p-6 rounded-lg shadow-lg border-2 border-[#8B4513] cursor-pointer 
                  transition-transform duration-300 hover:-translate-y-2"
                onClick={() => fetchTimelineData(timeline._id)}
              >
                <h2 className="text-2xl font-koulen text-[#8B4513] mb-2 border-b-2 border-[#8B4513] pb-2">
                  {timeline.title}
                </h2>
                <p className="text-stone-700 mb-4 border-2 border-[#8B4513] p-4 rounded">
                  {timeline.description}
                </p>
                <span className="inline-block bg-[#8B4513] text-white px-3 py-1 rounded">
                  {timeline.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <button
              onClick={() => setSelectedTimeline(null)}
              className="mb-8 bg-[#8B4513] text-white px-6 py-2 rounded hover:bg-[#6B3410] 
                transition-colors duration-300 w-full md:w-auto"
            >
              ← Back to Timelines
            </button>
            <Timeline timelineData={selectedTimeline.timelineData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineSelection;