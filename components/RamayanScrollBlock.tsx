"use client";

import { useEffect, useRef } from "react";

interface RamayanScrollBlockProps {
  id: string;
  index: number;
  onActive: (index: number) => void;
  children: React.ReactNode;
}

export default function RamayanScrollBlock({ id, index, onActive, children }: RamayanScrollBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the block is in the viewport (threshold determines how much needs to be visible)
          if (entry.isIntersecting) {
            onActive(index);
          }
        });
      },
      {
        root: null,
        // Trigger when the element is around the vertical center of the screen
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }
    };
  }, [index, onActive]);

  return (
    <div ref={blockRef} id={id} className="min-h-screen flex items-center justify-center py-20">
      {children}
    </div>
  );
}
