"use client";

import { useEffect, useState } from "react";

interface CinematicBackgroundProps {
  imageUrl: string;
  overlayOpacity?: number;
}

export default function CinematicBackground({ imageUrl, overlayOpacity = 0.6 }: CinematicBackgroundProps) {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);

  useEffect(() => {
    // When the imageUrl changes, add it to the array to trigger a crossfade
    setImages((prev) => {
      // Keep at most 2 images in the array to handle the crossfade
      const newImages = [...prev, { id: Math.random().toString(36).substring(7), url: imageUrl }];
      if (newImages.length > 2) {
        newImages.shift(); // Remove the oldest image
      }
      return newImages;
    });
  }, [imageUrl]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
      {images.map((img, index) => {
        const isLatest = index === images.length - 1;
        return (
          <div
            key={img.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              isLatest ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* The actual image with cinematic Ken Burns animation */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center animate-ken-burns"
              style={{ backgroundImage: `url('${img.url}')` }}
            />
          </div>
        );
      })}

      {/* Dark overlay to make text readable */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-1000"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Cinematic gradient overlay at the bottom and top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
    </div>
  );
}
