"use client"

import type React from "react"
import { useState } from "react"
import { Sword, Shield, Crown, Flame } from "lucide-react"

interface NarasimhaCardProps {
  title: string | { en: string; hi: string; or: string }
  meet?: string | { en: string; hi: string; or: string }
  place: string | { en: string; hi: string; or: string }
  year?: string | { en: string; hi: string; or: string }
  image: string
  story: string | { en: string; hi: string; or: string }
  fact?: string | { en: string; hi: string; or: string }
  index: number
  language: 'en' | 'hi' | 'or'
}

export const NarasimhaCard: React.FC<NarasimhaCardProps> = ({
  title,
  meet,
  place,
  year,
  image,
  story,
  fact,
  index,
  language
}) => {
  const [imgSrc, setImgSrc] = useState(image)
  const [hasError, setHasError] = useState(false)

  // Helper to get text based on language
  const getText = (content: string | { en: string; hi: string; or: string } | undefined) => {
    if (!content) return ""
    if (typeof content === 'string') return content
    return content[language] || content['en']
  }

  const currentTitle = getText(title)
  const currentMeet = getText(meet)
  const currentPlace = getText(place)
  const currentYear = getText(year)
  const currentStory = getText(story)
  const currentFact = getText(fact)

  // Labels based on language
  const labels = {
    en: { meet: "Character", place: "Location", fact: "Divine Fact" },
    hi: { meet: "पात्र", place: "स्थान", fact: "दिव्य तथ्य" },
    or: { meet: "ପାତ୍ର", place: "ସ୍ଥାନ", fact: "ଦିବ୍ୟ ତଥ୍ୟ" }
  }

  // Function to generate placeholder SVG (Golden/Fiery theme)
  const getPlaceholder = (text: string, idx: number) => {
    const gradients = [
      ['#d97706', '#92400e'], // amber-600 to amber-800
      ['#ea580c', '#c2410c'], // orange-600 to orange-700
      ['#b45309', '#78350f'], // amber-700 to amber-900
      ['#f59e0b', '#d97706'], // amber-500 to amber-600
    ]
    
    const [color1, color2] = gradients[idx % gradients.length]
    
    const svg = `
      <svg width="480" height="320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
        <rect x="10" y="10" width="460" height="300" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3" />
        <circle cx="240" cy="160" r="50" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
        <path d="M240 110 L290 210 L190 210 Z" fill="rgba(255,255,255,0.1)" />
      </svg>
    `.trim()

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }

  return (
    <div
      className={`group relative flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-6 md:gap-8 mb-12 md:mb-20 items-center animate-fadeIn`}
    >
      {/* Decorative Background Element */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5 rounded-3xl blur-3xl -z-10 group-hover:from-amber-600/10 group-hover:to-orange-600/10 transition-all duration-700" />

      {/* Image Section */}
      <div className="w-full md:w-1/2 perspective-1000">
        <div className="relative h-64 md:h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-amber-500/20 border-2 border-amber-500/30 group-hover:border-amber-400">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          <img
            src={hasError ? getPlaceholder(currentTitle, index) : imgSrc}
            alt={currentTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => {
              if (!hasError) setHasError(true)
            }}
          />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-cinzel tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-l-4 border-amber-500 pl-4 mb-2">
              {currentTitle}
            </h3>
            <div className="h-1 w-0 group-hover:w-20 bg-amber-500 transition-all duration-700 delay-100" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          {currentYear && (
            <span className="px-4 py-1.5 rounded-full bg-amber-900/40 text-amber-200 border border-amber-700/50 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {currentYear}
            </span>
          )}
          {currentMeet && (
            <span className="px-4 py-1.5 rounded-full bg-orange-900/40 text-orange-200 border border-orange-700/50 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <Crown className="w-3 h-3 inline-block mr-1" />
              {labels[language].meet}: {currentMeet}
            </span>
          )}
          {currentPlace && (
            <span className="px-4 py-1.5 rounded-full bg-stone-800/60 text-stone-200 border border-stone-600/50 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
              {labels[language].place}: {currentPlace}
            </span>
          )}
        </div>

        {/* Story Text */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-6xl text-amber-500/20 font-crimson">"</div>
          <p className="text-orange-100/90 font-crimson text-xl md:text-2xl leading-relaxed relative z-10 pl-2 text-justify">
            {currentStory}
          </p>
          <div className="absolute -right-4 -bottom-8 text-6xl text-amber-500/20 font-crimson rotate-180">"</div>
        </div>

        {/* Fun Fact Box */}
        {currentFact && (
          <div className="mt-4 relative group/fact overflow-hidden rounded-xl border border-amber-600/30 bg-gradient-to-br from-orange-900/20 to-stone-900/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <div className="absolute top-0 right-0 p-2 opacity-50 text-amber-500/20 scale-150 transform rotate-12 group-hover/fact:rotate-0 transition-transform duration-500">
              <Shield className="w-12 h-12" />
            </div>
            
            <div className="relative z-10 flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg shrink-0 mt-0.5">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">
                  {labels[language].fact}
                </h4>
                <p className="text-amber-100/80 text-sm italic font-medium">
                  {currentFact}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
