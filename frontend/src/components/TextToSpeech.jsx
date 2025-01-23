// TextToSpeech.jsx
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TextToSpeech = ({ 
  text, 
  className = '',
  voiceGender = 'female',
  voiceLang = 'en-US'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Common female voice identifiers
      const femaleIdentifiers = ['female', 'woman', 'girl', 'samantha', 'victoria', 'karen', 'moira', 'tessa'];
      
      // Try to find a female voice using various indicators
      const preferredVoice = voices.find(voice => {
        const voiceName = voice.name.toLowerCase();
        return voice.lang.includes(voiceLang) && 
               femaleIdentifiers.some(identifier => voiceName.includes(identifier));
      });

      // If no specific female voice found, try Microsoft voices which are usually clearer
      const microsoftFemaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('microsoft') && 
        femaleIdentifiers.some(identifier => voice.name.toLowerCase().includes(identifier))
      );

      // Set the voice with fallback options
      setSelectedVoice(preferredVoice || microsoftFemaleVoice || voices.find(v => v.lang.includes(voiceLang)));
    };

    // Initial setup
    setVoice();

    // Setup for Chrome
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
  }, [voiceLang]);

  const speak = () => {
    if (!isPlaying) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Adjust pitch and rate for more feminine voice characteristics
      utterance.pitch = 1.2;  // Slightly higher pitch
      utterance.rate = 0.95;  // Slightly slower rate
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Debug voice selection - you can remove this after testing
  useEffect(() => {
    if (selectedVoice) {
      console.log('Selected voice:', selectedVoice.name);
    }
  }, [selectedVoice]);

  return (
    <button
      onClick={speak}
      className={`p-2 rounded-full bg-[#8B4513] text-white hover:bg-[#734011] transition-colors duration-200 ${className}`}
      aria-label={isPlaying ? "Stop speaking" : "Start speaking"}
    >
      {isPlaying ? <VolumeX className="text-black" size={20} /> : <Volume2 className="text-black" size={20} />}
    </button>
  );
};

export default TextToSpeech;