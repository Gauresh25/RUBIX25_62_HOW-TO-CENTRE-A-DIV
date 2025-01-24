import React, { useState } from 'react';
import ChatModal from './Chat';

const HistoricalFigures = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const historicalFigures = [
    {
      id: 1,
      name: "Rani Lakshmibai",
      title: "Queen of Jhansi",
      image: "RaniLakshmi.png", // Replace with actual image
      description: "The brave Queen of Jhansi who led her forces against British troops in the Indian Rebellion of 1857.",
      period: "1828-1858",
    },
    {
      id: 2,
      name: "Leonardo da Vinci",
      title: "Renaissance Polymath",
      image: "davinci.png", // Replace with actual image
      description: "Italian Renaissance polymath: painter, sculptor, architect, scientist, and engineer.",
      period: "1452-1519",
    },
    {
      id: 3,
      name: "Cleopatra",
      title: "Queen of Egypt",
      image: "cleopatra.png", // Replace with actual image
      description: "The last active ruler of the Ptolemaic Kingdom of Egypt, known for her intelligence and political astuteness.",
      period: "69 BC - 30 BC",
    },
    {
      id: 4,
      name: "Franklin Roosevelt",
      title: "President of USA during second world war",
      image: "Roosevelt.png", // Replace with actual image
      description: "American statesman who led the allies to victory in the Second World War.",
      period: "1882-1945",
    }
  ];

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Chat with Historical Figures
        </h1>
        <p className="text-xl text-gray-600">
          Select a historical figure to start a conversation and learn about their experiences
        </p>
      </div>

      {/* Character Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {historicalFigures.map((figure) => (
          <div
            key={figure.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            onClick={() => selectCharacter(figure)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={figure.image}
                alt={figure.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {figure.name}
              </h3>
              <p className="text-sm text-blue-600 mb-2">
                {figure.title}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                {figure.description}
              </p>
              <p className="text-gray-500 text-sm font-medium">
                {figure.period}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      {selectedCharacter && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          characterName={selectedCharacter.name}
          characterImage={selectedCharacter.image}
        />
      )}

      {/* Info Section */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 text-2xl mb-3">1</div>
            <h3 className="font-bold mb-2">Choose a Character</h3>
            <p className="text-gray-600 text-sm">
              Select from our curated list of historical figures
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 text-2xl mb-3">2</div>
            <h3 className="font-bold mb-2">Start Chatting</h3>
            <p className="text-gray-600 text-sm">
              Ask questions and engage in conversation
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 text-2xl mb-3">3</div>
            <h3 className="font-bold mb-2">Learn History</h3>
            <p className="text-gray-600 text-sm">
              Gain insights from their unique perspectives
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalFigures;