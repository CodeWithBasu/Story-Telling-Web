"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface BackgroundMusicProps {
  src: string
  initialVolume?: number
}

export default function BackgroundMusic({ src, initialVolume = 0.3 }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = initialVolume;
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      const attemptPlay = () => {
        audio.play().catch(() => {});
        // Remove listener after first interaction
        document.removeEventListener('click', attemptPlay);
        document.removeEventListener('keydown', attemptPlay);
        document.removeEventListener('scroll', attemptPlay);
      };

      document.addEventListener('click', attemptPlay);
      document.addEventListener('keydown', attemptPlay);
      document.addEventListener('scroll', attemptPlay);
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        document.removeEventListener('click', attemptPlay);
        document.removeEventListener('keydown', attemptPlay);
        document.removeEventListener('scroll', attemptPlay);
      };
    }
  }, [initialVolume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all hover:scale-110">
      <audio 
        ref={audioRef} 
        src={src} 
        loop
        autoPlay={false}
      />
      
      <button
        onClick={togglePlay}
        className={`bg-black/40 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors shadow-lg group ${isPlaying ? 'animate-pulse-slow border-green-400/50' : ''}`}
        title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-6 h-6 text-white/50 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  )
}
