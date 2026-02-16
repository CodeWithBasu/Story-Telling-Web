"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Heart, ArrowRight } from "lucide-react"
import LightRays from "@/components/ui/LightRays"

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)

  return (
    <div className="h-screen w-full bg-black flex flex-col md:flex-row relative overflow-hidden font-sans">
      
      {/* RAMAYAN SECTION (LEFT) */}
      <Link 
        href="/ramayan"
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out overflow-hidden group border-b md:border-b-0 md:border-r border-orange-900/30 flex items-center justify-center
          ${hoveredSide === 'left' ? 'md:w-[65%]' : hoveredSide === 'right' ? 'md:w-[35%]' : 'md:w-1/2'}
          ${hoveredSide === 'left' ? 'brightness-110' : hoveredSide === 'right' ? 'brightness-50 grayscale-[50%]' : 'brightness-100'}
        `}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/ramayan/hanuman-leap.png')] bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-orange-950/40 to-transparent" />
        
        {/* Light Rays */}
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
           <LightRays
              raysOrigin="bottom-left"
              raysColor="#fbbf24" 
              raysSpeed={0.2}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.3}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-8 md:px-16 w-full max-w-4xl pt-20 md:pt-0">
          <div className="mb-4 md:mb-6 p-4 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/30 group-hover:bg-orange-500/30 transition-all duration-500">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100 mb-2 md:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:translate-x-2">
            The Ramayan
          </h2>
          
          <p className={`text-orange-100/90 font-serif text-lg md:text-2xl max-w-md transition-all duration-500 
            ${hoveredSide === 'right' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}
          `}>
            "The journey of righteousness, courage, and ultimate devotion."
          </p>

          <div className={`mt-8 flex items-center gap-3 text-amber-300 font-semibold tracking-widest text-sm uppercase transition-all duration-500
             ${hoveredSide === 'right' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            <span>Enter The Epic</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </Link>

      {/* RADHA KRISHNA SECTION (RIGHT) */}
      <Link 
        href="/radha-krishna"
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out overflow-hidden group border-t md:border-t-0 md:border-l border-pink-900/30 flex items-center justify-center
          ${hoveredSide === 'right' ? 'md:w-[65%]' : hoveredSide === 'left' ? 'md:w-[35%]' : 'md:w-1/2'}
          ${hoveredSide === 'right' ? 'brightness-110' : hoveredSide === 'left' ? 'brightness-50 grayscale-[50%]' : 'brightness-100'}
        `}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/radha-krishna/eternal-bond.png')] bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-black/80 via-purple-950/40 to-transparent" />

        {/* Light Rays */}
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
           <LightRays
              raysOrigin="bottom-right"
              raysColor="#f472b6" 
              raysSpeed={0.2}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.3}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center md:items-end text-center md:text-right px-8 md:px-16 w-full max-w-4xl pb-20 md:pb-0">
          <div className="mb-4 md:mb-6 p-4 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-400/30 group-hover:bg-pink-500/30 transition-all duration-500">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)] animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-purple-200 to-pink-100 mb-2 md:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-x-2">
            Radha Krishna
          </h2>
          
          <p className={`text-pink-100/90 font-serif text-lg md:text-2xl max-w-md transition-all duration-500 
            ${hoveredSide === 'left' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}
          `}>
            "The divine tale of eternal love, devotion, and celestial bliss."
          </p>

          <div className={`mt-8 flex items-center gap-3 text-pink-300 font-semibold tracking-widest text-sm uppercase transition-all duration-500
             ${hoveredSide === 'left' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
             <ArrowRight className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300 rotate-180 md:rotate-0 md:order-last" />
             <span className="md:order-first">Enter The Divine</span>
          </div>
        </div>
      </Link>
      
      {/* Center Divider / Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-screen hidden md:block">
        <div className="w-px h-64 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>

    </div>
  )
}
