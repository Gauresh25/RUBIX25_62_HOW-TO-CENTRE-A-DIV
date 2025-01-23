import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BookOpen, Navigation, Rocket, BookOpenCheck, Flame, PenTool, Map } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MapSlider = React.lazy(() => import('./SliderMap'));

// Minimal required custom styles
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
  <div className=" origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2">
    <img
      src={image || "/api/placeholder/400/300"}
      alt={title}
      className="w-full h-56 object-cover rounded-lg mb-4"
    />
    <h3 className="text-2xl font-koulen mb-2 text-[#8B4513]">{title}</h3>
    <p className="text-stone-700" style={{ fontFamily: 'system-ui' }}>{description}</p>
  </div>
);

const MapCard = ({ title, startYear, endYear, region }) => (
  <div className="scale-200 origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2 border-2 border-[#8B4513] rounded-lg overflow-hidden p-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-koulen text-[#8B4513]">{title}</h3>
      <div className="flex items-center gap-4">
        <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900"
        />
        <span className="font-bold">{startYear}</span>
        <ChevronRight 
          className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900"
        />
      </div>
    </div>
    <React.Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"/>}>
      <MapSlider
        startYear={startYear}
        endYear={endYear}
        region={region}
      />
    </React.Suspense>
  </div>
);

const QuoteCard = ({ quote, author, year }) => (
  <div className=" origin-left transition-transform duration-300 ease-in-out hover:-translate-y-2 p-6 bg-sepia-50 rounded-lg">
    <blockquote className="text-xl italic text-stone-700 mb-4">"{quote}"</blockquote>
    <p className="text-right text-stone-600">- {author}, {year}</p>
  </div>
);

const Timeline = () => {
  const events = [
    {
      year: 1440,
      type: 'text',
      content: {
        title: "Printing Press Invented",
        description: "Johannes Gutenberg invents the movable-type printing press, revolutionizing the spread of information in Europe.",
        image: "/api/placeholder/400/300"
      },
      icon: <PenTool />,
      iconBg: "#8B4513"
    },
    {
      year: "1939-1945",
      type: 'map',
      content: {
        title: "World War II in Europe",
        startYear: 1939,
        endYear: 1945,
        region: "europe"
      },
      icon: <Map />,
      iconBg: "#8B4513"
    },
    {
      year: 1863,
      type: 'quote',
      content: {
        quote: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
        author: "Abraham Lincoln",
        year: 1863
      },
      icon: <BookOpen />,
      iconBg: "#8B4513"
    },
    {
      year: 1969,
      type: 'text',
      content: {
        title: "Moon Landing",
        description: "NASA's Apollo 11 mission successfully lands humans on the Moon for the first time.",
        image: "/api/placeholder/400/300"
      },
      icon: <Rocket />,
      iconBg: "#8B4513"
    }
  ];

  const renderContent = (event) => {
    switch (event.type) {
      case 'text':
        return <TextCard {...event.content} />;
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
      
      <VerticalTimeline lineColor="#8B4513" >
        {events.map((event) => (
          <VerticalTimelineElement
            key={event.year}
            className="vertical-timeline-element"
            date={event.year}
            dateClassName="text-[#8B4513] font-koulen text-xl"
            contentStyle={{ 
              background: '#fff',
              boxShadow: '0 3px 10px rgb(139 69 19 / 0.2)',
              border: '1px solid #8B4513',
              fontFamily: 'Koulen, sans-serif'
            }}
            contentArrowStyle={{ 
              borderRight: '7px solid #8B4513' 
            }}
            iconStyle={{ 
              background: event.iconBg,
              color: '#fff'
            }}
            icon={event.icon}
          >
            {renderContent(event)}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;