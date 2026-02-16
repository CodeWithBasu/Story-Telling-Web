"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Heart, ArrowRight, Sword, Flame } from "lucide-react"
import LightRays from "@/components/ui/LightRays"
import { useIsTablet } from "@/hooks/use-mobile"

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<'ramayan' | 'mahabharat' | 'radhakrishna' | 'narasimha' | null>(null)
  const isTablet = useIsTablet()

  // Dynamic width classes for dramatic focus (Split for 4 sections)
  const getWidthClass = (section: 'ramayan' | 'mahabharat' | 'radhakrishna' | 'narasimha') => {
    if (isTablet) return 'min-h-[25vh] w-full'
    if (hoveredSection === null) return 'w-1/4'
    if (hoveredSection === section) return 'w-[55%]'
    return 'w-[15%]'
  }

  // Enhanced filter and brightness logic
  const getFilterClass = (section: 'ramayan' | 'mahabharat' | 'radhakrishna' | 'narasimha') => {
    if (hoveredSection === null) return 'brightness-90 grayscale-[20%]'
    if (hoveredSection === section) return 'brightness-110 grayscale-0 z-20'
    return 'brightness-40 grayscale-[80%] blur-[1px]'
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col md:flex-row relative overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* Global Noise Overlay for Cinematic Grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* RAMAYAN SECTION (1) */}
      <Link 
        href="/ramayan"
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group border-b md:border-b-0 md:border-r border-orange-900/20 flex items-center justify-center
          ${getWidthClass('ramayan')}
          ${getFilterClass('ramayan')}
        `}
        onMouseEnter={() => !isTablet && setHoveredSection('ramayan')}
        onMouseLeave={() => !isTablet && setHoveredSection(null)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-linear group-hover:scale-110 group-hover:duration-[8000ms]"
          style={{ backgroundImage: "url('/ramayan/hanuman-leap.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-orange-950/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTablet ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`}>
           <LightRays
              raysOrigin="bottom-left"
              raysColor="#fbbf24" 
              raysSpeed={0.2}
              lightSpread={isTablet ? 2.5 : 1.0}
              rayLength={isTablet ? 1.5 : 1.2}
              followMouse={!isTablet}
              mouseInfluence={0.4}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-6 transition-all duration-700">
          <div className="flex flex-col items-center text-center transform transition-transform duration-700 group-hover:translate-y-[-10px]">
            <div className={`mb-6 p-3 md:p-4 rounded-full bg-orange-500/10 backdrop-blur-xl border border-orange-400/20 group-hover:bg-orange-500/20 group-hover:border-orange-400/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-500 animate-pulse-slow ${hoveredSection && hoveredSection !== 'ramayan' && !isTablet ? 'hidden' : 'block'}`}>
              <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
            </div>
            
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-orange-200 to-amber-500 mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-wide transform transition-all duration-500 group-hover:scale-105 ${hoveredSection && hoveredSection !== 'ramayan' && !isTablet ? 'md:-rotate-90 md:whitespace-nowrap' : ''}`}>
              Ramayan
            </h2>
            
            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col items-center
              ${hoveredSection === 'ramayan' || isTablet ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
            `}>
              <p className="text-orange-100/80 font-serif text-sm md:text-lg max-w-xs italic mb-4 leading-relaxed drop-shadow-md">
                "The journey of righteousness."
              </p>
              <div className="px-5 py-2 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-sm text-amber-300 font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-3 transition-all duration-300 hover:bg-amber-900/30 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* MAHABHARAT SECTION (2) */}
      <Link 
        href="/mahabharat"
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group border-b md:border-b-0 md:border-r border-red-900/20 flex items-center justify-center
          ${getWidthClass('mahabharat')}
          ${getFilterClass('mahabharat')}
        `}
        onMouseEnter={() => !isTablet && setHoveredSection('mahabharat')}
        onMouseLeave={() => !isTablet && setHoveredSection(null)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-linear group-hover:scale-110 group-hover:duration-[8000ms]"
          style={{ backgroundImage: "url('/mahavarat/kurukshetra-poster.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-br from-black/90 via-red-950/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTablet ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`}>
           <LightRays
              raysOrigin="bottom-center"
              raysColor="#ef4444" 
              raysSpeed={0.2}
              lightSpread={isTablet ? 2.5 : 1.0}
              rayLength={isTablet ? 1.5 : 1.2}
              followMouse={!isTablet}
              mouseInfluence={0.4}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-6 transition-all duration-700">
           <div className="flex flex-col items-center text-center transform transition-transform duration-700 group-hover:translate-y-[-10px]">
             <div className={`mb-6 p-3 md:p-4 rounded-full bg-red-600/10 backdrop-blur-xl border border-red-500/20 group-hover:bg-red-600/20 group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-500 animate-pulse-slow ${hoveredSection && hoveredSection !== 'mahabharat' && !isTablet ? 'hidden' : 'block'}`}>
              <Sword className="w-6 h-6 md:w-10 md:h-10 text-red-400 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            </div>
            
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-red-100 via-amber-200 to-red-600 mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-wide transform transition-all duration-500 group-hover:scale-105 ${hoveredSection && hoveredSection !== 'mahabharat' && !isTablet ? 'md:-rotate-90 md:whitespace-nowrap' : ''}`}>
              Mahabharat
            </h2>
            
            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col items-center
              ${hoveredSection === 'mahabharat' || isTablet ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
            `}>
              <p className="text-red-100/80 font-serif text-sm md:text-lg max-w-xs italic mb-4 leading-relaxed drop-shadow-md">
                "The Great War of Dharma."
              </p>
              <div className="px-5 py-2 rounded-full border border-red-500/30 bg-black/40 backdrop-blur-sm text-red-300 font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-3 transition-all duration-300 hover:bg-red-900/30 hover:border-red-400/60 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                <span>Enter War</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
           </div>
        </div>
      </Link>

      {/* NARASIMHA SECTION (3 - NEW) */}
      <Link 
        href="/narasimha"
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group border-b md:border-b-0 md:border-r border-amber-900/20 flex items-center justify-center
          ${getWidthClass('narasimha')}
          ${getFilterClass('narasimha')}
        `}
        onMouseEnter={() => !isTablet && setHoveredSection('narasimha')}
        onMouseLeave={() => !isTablet && setHoveredSection(null)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-linear group-hover:scale-110 group-hover:duration-[8000ms]"
          style={{ backgroundImage: "url('/narasimha/poster.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-black/90 via-amber-950/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTablet ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`}>
           <LightRays
              raysOrigin="center"
              raysColor="#d97706" 
              raysSpeed={0.25}
              lightSpread={isTablet ? 2.5 : 1.0}
              rayLength={isTablet ? 1.5 : 1.2}
              followMouse={!isTablet}
              mouseInfluence={0.5}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-6 transition-all duration-700">
           <div className="flex flex-col items-center text-center transform transition-transform duration-700 group-hover:translate-y-[-10px]">
             <div className={`mb-6 p-3 md:p-4 rounded-full bg-amber-600/10 backdrop-blur-xl border border-amber-500/20 group-hover:bg-amber-600/20 group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] transition-all duration-500 animate-pulse-slow ${hoveredSection && hoveredSection !== 'narasimha' && !isTablet ? 'hidden' : 'block'}`}>
              <Flame className="w-6 h-6 md:w-10 md:h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(217,119,6,0.8)]" />
            </div>
            
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-orange-300 to-amber-600 mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-wide transform transition-all duration-500 group-hover:scale-105 ${hoveredSection && hoveredSection !== 'narasimha' && !isTablet ? 'md:-rotate-90 md:whitespace-nowrap' : ''}`}>
              Narasimha
            </h2>
            
            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col items-center
              ${hoveredSection === 'narasimha' || isTablet ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
            `}>
              <p className="text-amber-100/80 font-serif text-sm md:text-lg max-w-md italic mb-4 leading-relaxed drop-shadow-md">
                "The Divine Protector."
              </p>
              <div className="px-5 py-2 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-sm text-amber-300 font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-3 transition-all duration-300 hover:bg-amber-900/30 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                <span>Witness Fury</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
           </div>
        </div>
      </Link>

      {/* RADHA KRISHNA SECTION (4) */}
      <Link 
        href="/radha-krishna"
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group border-t md:border-t-0 md:border-l border-pink-900/20 flex items-center justify-center
          ${getWidthClass('radhakrishna')}
          ${getFilterClass('radhakrishna')}
        `}
        onMouseEnter={() => !isTablet && setHoveredSection('radhakrishna')}
        onMouseLeave={() => !isTablet && setHoveredSection(null)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-linear group-hover:scale-110 group-hover:duration-[8000ms]"
          style={{ backgroundImage: "url('/radha-krishna/eternal-bond.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-black/90 via-purple-950/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

        <div className={`absolute inset-0 transition-opacity duration-500 ${isTablet ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`}>
           <LightRays
              raysOrigin="bottom-right"
              raysColor="#f472b6" 
              raysSpeed={0.2}
              lightSpread={isTablet ? 2.5 : 1.0}
              rayLength={isTablet ? 1.5 : 1.2}
              followMouse={!isTablet}
              mouseInfluence={0.4}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-6 transition-all duration-700 text-center md:text-right">
           <div className="flex flex-col items-center transform transition-transform duration-700 group-hover:translate-y-[-10px]">
             <div className={`mb-6 p-3 md:p-4 rounded-full bg-pink-500/10 backdrop-blur-xl border border-pink-400/20 group-hover:bg-pink-500/20 group-hover:border-pink-400/50 group-hover:shadow-[0_0_30px_rgba(244,114,182,0.3)] transition-all duration-500 animate-pulse-slow ${hoveredSection && hoveredSection !== 'radhakrishna' && !isTablet ? 'hidden' : 'block'}`}>
              <Heart className="w-6 h-6 md:w-10 md:h-10 text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
            </div>
            
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-pink-100 via-purple-200 to-pink-500 mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-wide transform transition-all duration-500 group-hover:scale-105 ${hoveredSection && hoveredSection !== 'radhakrishna' && !isTablet ? 'md:-rotate-90 md:whitespace-nowrap' : ''}`}>
              Radha Krishna
            </h2>
            
            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col items-center
              ${hoveredSection === 'radhakrishna' || isTablet ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
            `}>
              <p className="text-pink-100/80 font-serif text-sm md:text-lg max-w-md italic mb-4 leading-relaxed drop-shadow-md">
                "The divine tale of eternal love."
              </p>
              <div className="px-5 py-2 rounded-full border border-pink-500/30 bg-black/40 backdrop-blur-sm text-pink-300 font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-3 transition-all duration-300 hover:bg-pink-900/30 hover:border-pink-400/60 hover:shadow-[0_0_15px_rgba(244,114,182,0.2)]">
                <span>Divine Love</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
           </div>
        </div>
      </Link>
      
    </div>
  )
}
