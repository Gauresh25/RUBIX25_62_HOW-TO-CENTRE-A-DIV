import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import TextToSpeech from './TextToSpeech';

const ChatModal = ({ 
  isOpen, 
  onClose, 
  characterName = 'AI Assistant',
  characterImage = '/api/placeholder/100/100'
}) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Initialize Google AI
  const genAI = new GoogleGenerativeAI("AIzaSyC_U5zMaXs5WikVxsTbcvzajRYlfe4irqw");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createConversation = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    return model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are ${characterName}. Please respond in first-person, describing your thoughts, actions, and historical events as if you were experiencing them. Be engaging, informative, and historically accurate.`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `I understand. I shall embody the spirit and voice of ${characterName}, speaking from my experiences.`,
            },
          ],
        },
      ],
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsExpanded(true);

    try {
      const chat = await createConversation();
      const result = await chat.sendMessage([{ text: message }]);
      const response = result.response;

      const botMessage = {
        sender: characterName,
        text: response.text()
      };
      
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        sender: 'system',
        text: 'I apologize, but I am unable to respond at the moment. Please try again later.'
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={chatRef}
      className="fixed bottom-4 right-4 flex flex-col z-50 w-96"
    >
      {/* Chat Messages */}
      {isExpanded && conversation.length > 0 && (
        <div className="mb-4 p-4 max-h-[70vh] overflow-y-auto rounded-2xl bg-white shadow-lg border border-gray-100">
          {conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender !== 'user' && (
                <img 
                  src={characterImage} 
                  alt={characterName}
                  className="w-10 h-10 rounded-full mr-2 self-end shadow-sm border-2 border-gray-100"
                />
              )}
              <div className="flex flex-col max-w-[75%]">
                <div 
                  className={`p-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-50 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  {msg.sender !== 'user' && (
                    <div className="flex justify-end mt-2">
                      <TextToSpeech 
                        text={msg.text}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <img 
                src={characterImage} 
                alt={characterName}
                className="w-10 h-10 rounded-full mr-2 self-end shadow-sm border-2 border-gray-100"
              />
              <div className="bg-gray-50 text-gray-500 p-4 rounded-2xl rounded-bl-none shadow-sm animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Form */}
      <div className="flex items-end bg-white p-4 rounded-2xl shadow-lg">
        <img 
          src={characterImage} 
          alt={characterName}
          className="w-16 h-16 rounded-full cursor-pointer hover:scale-105 transition-transform shadow-md border-2 border-gray-100"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <form onSubmit={sendMessage} className="flex-1 ml-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Chat with ${characterName}...`}
              className="flex-1 p-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onClick={() => setIsExpanded(true)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;