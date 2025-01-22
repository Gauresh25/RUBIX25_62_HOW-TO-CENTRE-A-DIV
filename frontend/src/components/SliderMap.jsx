import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MapSlider = ({
  startYear = 1935,
  endYear = 1945,
  region = 'europe'
}) => {
  const [currentYear, setCurrentYear] = useState(startYear);

  const handlePrevYear = () => {
    if (currentYear > startYear) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextYear = () => {
    if (currentYear < endYear) {
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min={startYear}
            max={endYear}
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none hover:bg-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1 border border-gray-200">
          <ChevronLeft
            onClick={handlePrevYear}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              currentYear <= startYear
                ? 'text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          />
          <span className="font-bold text-xl w-16 text-center">
            {currentYear}
          </span>
          <ChevronRight
            onClick={handleNextYear}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              currentYear >= endYear
                ? 'text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          />
        </div>
      </div>

      <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`/slidermap/${currentYear}_${region}.png`}
          alt={`${region} map ${currentYear}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MapSlider;