// Timeline.jsx
import React, { Suspense } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TextToSpeech from './TextToSpeech';

const MapSlider = React.lazy(() => import('./SliderMap'));
const ThreeViewer = React.lazy(() => import('./3dmodel'));

const customStyles = `
  .vertical-timeline::before {
    background: #8B4513 !important;
    width: 4px !important;
  }
    
  .vertical-timeline {
    width: 100% !important;
    max-width: none !important;
    padding: 0 48px !important;
  }

  .vertical-timeline-element-icon {
    box-shadow: 0 0 0 4px #8B4513, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05) !important;
  }

  @font-face {
    font-family: 'Koulen';
    src: url('https://fonts.googleapis.com/css2?family=Koulen&display=block');
  }
`;

const TextCard = ({ title, description, image }) => (
  <div className="origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2">
    <img
      src={image || "/api/placeholder/400/300"}
      alt={title}
      className="w-full h-56 object-cover rounded-lg mb-4"
    />
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-2xl font-koulen text-[#8B4513]">{title}</h3>
      <TextToSpeech text={`${title}. ${description}`} />
    </div>
    <p className="text-stone-700" style={{ fontFamily: 'system-ui' }}>{description}</p>
  </div>
);

const ThreeDCard = ({ title, modelUrl, caption }) => (
  <div className="origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2">
    <Suspense fallback={<div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg"/>}>
      <ThreeViewer modelUrl={modelUrl} caption={caption} />
    </Suspense>
  </div>
);

const MapCard = ({ title, startYear, endYear, region }) => (
  <div className="scale-200 origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2 border-2 border-[#8B4513] rounded-lg overflow-hidden p-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-koulen text-[#8B4513]">{title}</h3>
      <span className="font-bold">{startYear}</span>
    </div>
    <Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"/>}>
      <MapSlider startYear={startYear} endYear={endYear} region={region} />
    </Suspense>
  </div>
);

const QuoteCard = ({ quote, author, year }) => (
  <div className="origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2 p-6 bg-sepia-50 rounded-lg">
    <blockquote className="text-xl italic text-stone-700 mb-4">"{quote}"</blockquote>
    <p className="text-right text-stone-600">- {author}, {year}</p>
  </div>
);

const Timeline = ({ timelineData }) => {
  const renderContent = (event) => {
    switch (event.type) {
      case 'text':
        return <TextCard {...event.content} />;
      case '3d':
        return <ThreeDCard {...event.content} />;
      case 'map':
        return <MapCard {...event.content} />;
      case 'quote':
        return <QuoteCard {...event.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <style>{customStyles}</style>
      <h1 className="text-4xl text-center pt-12 pb-16 text-[#8B4513] font-koulen">
        Interactive Historical Timeline
      </h1>
      <VerticalTimeline lineColor="#8B4513">
        {timelineData.map((event) => (
          <VerticalTimelineElement
            key={event.year}
            date={event.year}
            dateClassName="text-[#8B4513] font-koulen text-xl"
            contentStyle={{ 
              background: '#fff',
              boxShadow: '0 3px 10px rgb(139 69 19 / 0.2)',
              border: '1px solid #8B4513',
              fontFamily: 'Koulen, sans-serif'
            }}
            contentArrowStyle={{ borderRight: '7px solid #8B4513' }}
          >
            {renderContent(event)}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;