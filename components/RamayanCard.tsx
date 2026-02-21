"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Zap, BookOpen } from "lucide-react"

interface RamayanCardProps {
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

export const RamayanCard: React.FC<RamayanCardProps> = ({
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
    en: { meet: "Meet", place: "Place", fact: "Fun Fact", readMore: "Read Detailed Version", loading: "Fetching from Scriptures...", close: "Close" },
    hi: { meet: "मिलिए", place: "स्थान", fact: "रोचक तथ्य", readMore: "विस्तृत विवरण पढ़ें", loading: "शास्त्रों से खोज रहे हैं...", close: "बंद करें" },
    or: { meet: "ଭେଟନ୍ତୁ", place: "ସ୍ଥାନ", fact: "ମଜାଦାର ତଥ୍ୟ", readMore: "ବିସ୍ତୃତ ବିବରଣୀ ପଢନ୍ତୁ", loading: "ଶାସ୍ତ୍ରରୁ ଖୋଜୁଛି...", close: "ବନ୍ଦ କରନ୍ତୁ" }
  }

  const fetchDetailedContent = async () => {
    if (detailedData) {
      setShowDetailed(true)
      return
    }

    setIsLoading(true)
    try {
      // Using the id prop directly for mapping in route.ts
      const response = await fetch(`/api/story-detail?storyId=${id}`);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error('API Error details:', errData);
        throw new Error(errData.message || 'Fetch failed');
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
      ['#ff6b35', '#f7931e'], // orange
      ['#f7931e', '#fbbf24'], // yellow-orange
      ['#10b981', '#059669'], // green
      ['#fbbf24', '#f59e0b'], // gold
      ['#dc2626', '#991b1b'], // red
      ['#f97316', '#ea580c'], // bright orange
      ['#3b82f6', '#2563eb'], // blue
      ['#ef4444', '#dc2626'], // bright red
      ['#6366f1', '#4f46e5'], // indigo
      ['#7c3aed', '#6d28d9'], // purple
      ['#8b5cf6', '#7c3aed'], // violet
      ['#ec4899', '#db2777'], // pink
      ['#f59e0b', '#d97706'], // amber
      ['#10b981', '#059669'], // emerald
      ['#6366f1', '#4f46e5'], // blue-indigo
    ]
    
    // Select gradient based on index
    const [color1, color2] = gradients[idx % gradients.length]
    
    // Create valid SVG with proper XML escaping
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
        <path d="M260 220 L300 170 L340 220" fill="rgba(255,255,255,0.15)" />
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
      {/* Decorative Background Element for each card */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl blur-3xl -z-10 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-700" />

      {/* Image Section */}
      <div className="w-full md:w-1/2 perspective-1000">
        <div className="relative h-64 md:h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-orange-500/20 border-2 border-orange-500/30 group-hover:border-orange-400">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          <img
            src={hasError ? getPlaceholder(currentTitle, index) : imgSrc}
            alt={currentTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => {
              if (!hasError) {
                setHasError(true)
              }
            }}
          />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-cinzel tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-l-4 border-orange-500 pl-4 mb-2">
              {currentTitle}
            </h3>
            <div className="h-1 w-0 group-hover:w-20 bg-orange-500 transition-all duration-700 delay-100" />
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
              {labels[language].meet}: {currentMeet}
            </span>
          )}
          {currentPlace && (
            <span className="px-4 py-1.5 rounded-full bg-red-900/40 text-red-200 border border-red-700/50 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
              {labels[language].place}: {currentPlace}
            </span>
          )}
        </div>

        {/* Story Text */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-6xl text-orange-500/20 font-crimson">"</div>
          <p className="text-orange-100/90 font-crimson text-xl md:text-2xl leading-relaxed relative z-10 pl-2 text-justify">
            {currentStory}
          </p>
          <div className="absolute -right-4 -bottom-8 text-6xl text-orange-500/20 font-crimson rotate-180">"</div>
        </div>

        {/* Action Button */}
        <div className="flex justify-start">
          <button
            onClick={fetchDetailedContent}
            disabled={isLoading}
            className="group/btn relative px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-orange-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait overflow-hidden"
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

        {/* Fun Fact Box */}
        <div className="mt-4 relative group/fact overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]">
          <div className="absolute top-0 right-0 p-2 opacity-50 text-yellow-500/20 scale-150 transform rotate-12 group-hover/fact:rotate-0 transition-transform duration-500">
            <Zap className="w-12 h-12" />
          </div>
          
          <div className="relative z-10 flex items-start gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg shrink-0 mt-0.5">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1">
                {labels[language].fact}
              </h4>
              <p className="text-yellow-100/80 text-sm italic font-medium">
                {currentFact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {showDetailed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-orange-500/30 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-orange-950/40 to-black">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">
                  {detailedData?.kandaName}
                </div>
                <h2 className="text-2xl md:text-3xl font-cinzel text-orange-200">
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
                <div className="text-orange-100/80 text-lg md:text-xl leading-relaxed italic text-center p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10">
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
                      <div className="text-orange-200/60 text-base md:text-lg italic max-w-2xl mx-auto border-t border-orange-500/20 pt-4">
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
