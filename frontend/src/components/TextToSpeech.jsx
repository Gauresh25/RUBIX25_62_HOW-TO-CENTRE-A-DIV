import React, { useState, useCallback } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';

const TextToSpeech = ({ text, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Store utterance in ref to access across state updates
  const utteranceRef = React.useRef(null);
  
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const pauseSpeaking = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resumeSpeaking = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const startSpeaking = useCallback(() => {
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configure utterance
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Handle end of speech
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    // Handle errors
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    // Start speaking
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  }, [text]);

  const handleClick = () => {
    if (isPlaying) {
      if (isPaused) {
        resumeSpeaking();
      } else {
        pauseSpeaking();
      }
    } else {
      startSpeaking();
    }
  };

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const buttonBaseClasses = 'p-2 rounded-full transition-colors duration-200 ' + className;
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className={`${buttonBaseClasses} ${
          isPlaying ? 'bg-[#8B4513] text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
        aria-label={isPlaying ? (isPaused ? "Resume speaking" : "Pause speaking") : "Start speaking"}
      >
        {isPlaying ? (
          isPaused ? <Volume2 size={20} /> : <Pause size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>
      {isPlaying && (
        <button
          onClick={stopSpeaking}
          className={`${buttonBaseClasses} bg-red-500 hover:bg-red-600 text-white`}
          aria-label="Stop speaking"
        >
          <VolumeX size={20} />
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;