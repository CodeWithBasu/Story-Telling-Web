"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sword, Shield, Crown, BookOpen } from "lucide-react"

interface MahabharatCardProps {
  id: string
  title: string | { en: string; hi: string; or: string }
  meet?: string | { en: string; hi: string; or: string }
  place: string | { en: string; hi: string; or: string }
  year?: string | { en: string; hi: string; or: string }
  image: string
  story: string | { en: string; hi: string; or: string }
  fact: string | { en: string; hi: string; or: string }
  index: number
  language: 'en' | 'hi' | 'or'
}

export const MahabharatCard: React.FC<MahabharatCardProps> = ({
  id,
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
  const [showDetailed, setShowDetailed] = useState(false)
  const [detailedData, setDetailedData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

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
    en: { meet: "Meet", place: "Location", fact: "Epic Fact", readMore: "Read Detailed Version", loading: "Fetching Archives...", close: "Close" },
    hi: { meet: "पात्र", place: "स्थान", fact: "रोचक तथ्य", readMore: "विस्तृत विवरण पढ़ें", loading: "खोज रहे हैं...", close: "बंद करें" },
    or: { meet: "ପାତ୍ର", place: "ସ୍ଥାନ", fact: "ମଜାଦାର ତଥ୍ୟ", readMore: "ବିସ୍ତୃତ ବିବରଣୀ ପଢନ୍ତୁ", loading: "ଖୋଜୁଛି...", close: "ବନ୍ଦ କରନ୍ତୁ" }
  }

  const fetchDetailedContent = async () => {
    if (detailedData) {
      setShowDetailed(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/mahabharat-story-detail?storyId=${id}`);
      if (!response.ok) {
        throw new Error('Fetch failed');
      }
      const data = await response.json();
      setDetailedData(data);
      setShowDetailed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to generate placeholder SVG
  const getPlaceholder = (text: string, idx: number) => {
    const gradients = [
      ['#b91c1c', '#991b1b'], // red-700 to red-800
      ['#ef4444', '#b91c1c'], // red-500 to red-700
      ['#f59e0b', '#b45309'], // amber
      ['#7f1d1d', '#450a0a'], // deep red
      ['#a16207', '#713f12'], // yellow-brown
      ['#9f1239', '#881337'], // rose
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
        <path d="M190 220 L240 150 L290 220" fill="rgba(255,255,255,0.2)" />
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
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-amber-600/5 rounded-3xl blur-3xl -z-10 group-hover:from-red-600/10 group-hover:to-amber-600/10 transition-all duration-700" />

      {/* Image Section */}
      <div className="w-full md:w-1/2 perspective-1000">
        <div className="relative h-64 md:h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-red-500/20 border-2 border-red-500/30 group-hover:border-red-400">
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
            <h3 className="text-2xl md:text-3xl font-bold text-white font-cinzel tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-l-4 border-red-500 pl-4 mb-2">
              {currentTitle}
            </h3>
            <div className="h-1 w-0 group-hover:w-20 bg-red-500 transition-all duration-700 delay-100" />
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
            <span className="px-4 py-1.5 rounded-full bg-red-900/40 text-red-200 border border-red-700/50 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
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
          <div className="absolute -left-4 -top-4 text-6xl text-red-500/20 font-crimson">"</div>
          <p className="text-red-100/90 font-crimson text-xl md:text-2xl leading-relaxed relative z-10 pl-2 text-justify">
            {currentStory}
          </p>
          <div className="absolute -right-4 -bottom-8 text-6xl text-red-500/20 font-crimson rotate-180">"</div>
        </div>

        {/* Fun Fact Box */}
        <div className="mt-4 relative group/fact overflow-hidden rounded-xl border border-amber-600/30 bg-gradient-to-br from-red-900/20 to-stone-900/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(185,28,28,0.15)]">
          <div className="absolute top-0 right-0 p-2 opacity-50 text-red-500/20 scale-150 transform rotate-12 group-hover/fact:rotate-0 transition-transform duration-500">
            <Shield className="w-12 h-12" />
          </div>
          
          <div className="relative z-10 flex items-start gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg shrink-0 mt-0.5">
              <Sword className="w-5 h-5 text-red-400" />
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

        {/* Action Button */}
        <div className="flex justify-start mt-6">
          <button
            onClick={fetchDetailedContent}
            disabled={isLoading}
            className="group/btn relative px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-red-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {labels[language].loading}
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  {labels[language].readMore}
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Detailed Modal */}
      {showDetailed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-red-500/30 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-red-950/40 to-black">
              <div className="space-y-1">
                {detailedData?.kandaName && (
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em]">
                    {detailedData.kandaName}
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-cinzel text-red-200">
                  {detailedData?.title || currentTitle}
                </h2>
              </div>
              <button
                onClick={() => setShowDetailed(false)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-xs uppercase font-bold tracking-widest">{labels[language].close}</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-8 font-crimson">
              {detailedData?.description && (
                <div className="text-red-100/80 text-lg md:text-xl leading-relaxed italic text-center p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                  {detailedData.description}
                </div>
              )}

              {detailedData?.shlokas?.length > 0 ? (
                <div className="space-y-12">
                  {detailedData.shlokas.map((s: any, i: number) => (
                    <div key={i} className="space-y-4 text-center">
                      <div className="text-amber-500 text-2xl md:text-3xl leading-relaxed font-semibold">
                        {s.shloka}
                      </div>
                      <div className="text-red-200/60 text-base md:text-lg italic max-w-2xl mx-auto border-t border-red-500/20 pt-4">
                        {s.translation || s.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-12">
                  No detailed verses found for this chapter yet.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-widest">
              Source: {detailedData?.source || 'Traditional Scriptures'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
