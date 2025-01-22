import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BookOpen, Navigation, Rocket, BookOpenCheck, Flame, PenTool } from 'lucide-react';

// Custom styles to override the default timeline styling
const customStyles = `
  .vertical-timeline::before {
    background: #8B4513 !important;
    width: 4px !important;
  }

  .vertical-timeline-element-icon {
    box-shadow: 0 0 0 4px #8B4513, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05) !important;
  }

  @font-face {
    font-family: 'Koulen';
    src: url('https://fonts.googleapis.com/css2?family=Koulen&display=block');
  }
`;

const Timeline = () => {
  const events = [
    {
      year: 1440,
      title: "Printing Press Invented",
      description: "Johannes Gutenberg invents the movable-type printing press, revolutionizing the spread of information in Europe.",
      icon: <PenTool />,
      iconBg: "#8B4513"
    },
    {
      year: 1492,
      title: "Discovery of the Americas",
      description: "Christopher Columbus reaches the Americas, initiating large-scale contact between Europe and the Americas.",
      icon: <Navigation />,
      iconBg: "#8B4513"
    },
    {
      year: 1769,
      title: "Steam Engine Patented",
      description: "James Watt patents the steam engine, marking a key moment in the Industrial Revolution.",
      icon: <Flame />,
      iconBg: "#8B4513"
    },
    {
      year: 1859,
      title: "Origin of Species Published",
      description: "Charles Darwin publishes 'On the Origin of Species', introducing the theory of evolution by natural selection.",
      icon: <BookOpen />,
      iconBg: "#8B4513"
    },
    {
      year: 1903,
      title: "First Powered Flight",
      description: "The Wright brothers achieve the first powered, sustained flight in Kitty Hawk, North Carolina.",
      icon: <BookOpenCheck />,
      iconBg: "#8B4513"
    },
    {
      year: 1969,
      title: "Moon Landing",
      description: "NASA's Apollo 11 mission successfully lands humans on the Moon for the first time.",
      icon: <Rocket />,
      iconBg: "#8B4513"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      <style>{customStyles}</style>
      
      <h1 className="text-4xl text-center pt-12 pb-16 text-[#8B4513]" style={{ fontFamily: 'Koulen, sans-serif' }}>
        Historical Timeline
      </h1>
      
      <VerticalTimeline lineColor="#8B4513">
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
            <div className="relative">
              <img
                src="/api/placeholder/400/300"
                alt={`Illustration of ${event.title}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <h3 className="text-2xl font-koulen mb-2 text-[#8B4513]">
                {event.title}
              </h3>
              
              <p className="text-stone-700" style={{ fontFamily: 'system-ui' }}>
                {event.description}
              </p>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;