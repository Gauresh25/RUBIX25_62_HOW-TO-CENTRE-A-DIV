import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TextToSpeech from './TextToSpeech';

const ChatModal = ({ 
  isOpen, 
  onClose, 
  characterName = 'AI Assistant',
  characterImage = '/api/placeholder/100/100',
  apiEndpoint = 'http://localhost:5000/chat',
}) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsExpanded(true);

    try {
      const response = await axios.post(apiEndpoint, {
        message: message
      });

      const botMessage = {
        sender: characterName,
        text: response.data.reply
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
      className="fixed bottom-4 right-4 flex flex-col z-50"
      style={{ maxWidth: '400px' }}
    >
      {/* Chat Messages */}
      {isExpanded && conversation.length > 0 && (
        <div className="mb-4 p-4 max-h-96 overflow-y-auto rounded-lg bg-white/80 backdrop-blur-sm">
          {conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender !== 'user' && (
                <img 
                  src={characterImage} 
                  alt={characterName}
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              <div className="flex flex-col max-w-[70%]">
                <div 
                  className={`p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  {msg.sender !== 'user' && (
                    <div className="flex justify-end mt-2">
                      <TextToSpeech 
                        text={msg.text}
                        className="p-1 bg-transparent hover:bg-gray-200/50 text-black"
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
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
              <div className="bg-gray-100 text-gray-500 p-3 rounded-2xl rounded-bl-none">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Form */}
      <div className="flex items-end">
        <img 
          src={characterImage} 
          alt={characterName}
          className="w-20 h-20 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <form onSubmit={sendMessage} className="flex-1 ml-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Talk with ${characterName}...`}
              className="flex-1 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsExpanded(true)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
