
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Zap, BookOpen } from "lucide-react"

interface RadhaKrishnaCardProps {
  id: string
  title: string | { en: string; hi: string; or: string }
  meet?: string | { en: string; hi: string; or: string }
  place?: string | { en: string; hi: string; or: string }
  year?: string | { en: string; hi: string; or: string }
  image: string
  story: string | { en: string; hi: string; or: string }
  fact: string | { en: string; hi: string; or: string }
  index: number
  language: 'en' | 'hi' | 'or'
}

export const RadhaKrishnaCard: React.FC<RadhaKrishnaCardProps> = ({
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
    en: { meet: "Meet", place: "Place", fact: "Fun Fact", readMore: "Read Divine Details", loading: "Fetching Lila...", close: "Close" },
    hi: { meet: "मिलिए", place: "स्थान", fact: "रोचक तथ्य", readMore: "विस्तृत विवरण पढ़ें", loading: "खोज रहे हैं...", close: "बंद करें" },
    or: { meet: "ଭେଟନ୍ତୁ", place: "ସ୍ଥାନ", fact: "ମଜାଦାର ତଥ୍ୟ", readMore: "ବିସ୍ତୃତ ବିବରଣୀ ପଢନ୍ତୁ", loading: "ଖୋଜୁଛି...", close: "ବନ୍ଦ କରନ୍ତୁ" }
  }

  const fetchDetailedContent = async () => {
    if (detailedData) {
      setShowDetailed(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/radhakrishna-story-detail?storyId=${id}`);
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
      ['#0ea5e9', '#3b82f6'], // sky-blue
      ['#8b5cf6', '#6366f1'], // violet-indigo
      ['#ec4899', '#db2777'], // pink
      ['#14b8a6', '#0d9488'], // teal
      ['#6366f1', '#4f46e5'], // indigo
      ['#a855f7', '#9333ea'], // purple
      ['#06b6d4', '#0891b2'], // cyan
      ['#f472b6', '#db2777'], // rose
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
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="24" fill="white" font-weight="bold">${text}</text>
      </svg>
    `.trim()

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }


  const titleFont = language === 'en' ? 'font-cinzel' : 'font-rozha-one'
  const bodyFont = 'font-crimson'

  return (
    <div
      className={`group relative flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-6 md:gap-8 mb-12 md:mb-20 items-center animate-fadeIn`}
    >
      {/* Decorative Background Element for each card */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-pink-500/5 rounded-3xl blur-3xl -z-10 group-hover:from-sky-500/10 group-hover:to-pink-500/10 transition-all duration-700" />

      {/* Image Section */}
      <div className="w-full md:w-1/2 perspective-1000">
        <div className="relative h-64 md:h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-sky-500/20 border-2 border-sky-500/30 group-hover:border-sky-400">
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
            <h3 className={`text-2xl md:text-3xl font-bold text-white ${titleFont} tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-l-4 border-sky-400 pl-4 mb-2`}>
              {currentTitle}
            </h3>
            <div className="h-1 w-0 group-hover:w-20 bg-sky-400 transition-all duration-700 delay-100" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          {currentYear && (
            <span className="px-4 py-1.5 rounded-full bg-indigo-900/40 text-indigo-200 border border-indigo-700/50 text-xs font-bold font-laila uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {currentYear}
            </span>
          )}
          {currentMeet && (
            <span className="px-4 py-1.5 rounded-full bg-sky-900/40 text-sky-200 border border-sky-700/50 text-xs font-bold font-laila uppercase tracking-wider backdrop-blur-md shadow-lg">
              {labels[language].meet}: {currentMeet}
            </span>
          )}
          {currentPlace && (
            <span className="px-4 py-1.5 rounded-full bg-pink-900/40 text-pink-200 border border-pink-700/50 text-xs font-bold font-laila uppercase tracking-wider backdrop-blur-md shadow-lg">
              {labels[language].place}: {currentPlace}
            </span>
          )}
        </div>

        {/* Story Text */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-7xl text-sky-500/20 font-great-vibes">"</div>
          <p className={`text-sky-50/90 ${bodyFont} text-lg md:text-xl leading-relaxed relative z-10 pl-2 text-justify font-medium`}>
            {currentStory}
          </p>
          <div className="absolute -right-4 -bottom-8 text-7xl text-sky-500/20 font-great-vibes rotate-180">"</div>
        </div>

        {/* Fun Fact Box */}
        <div className="mt-4 relative group/fact overflow-hidden rounded-xl border border-pink-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]">
          <div className="absolute top-0 right-0 p-2 opacity-50 text-pink-500/20 scale-150 transform rotate-12 group-hover/fact:rotate-0 transition-transform duration-500">
            <Zap className="w-12 h-12" />
          </div>
          
          <div className="relative z-10 flex items-start gap-3">
            <div className="p-2 bg-pink-500/10 rounded-lg shrink-0 mt-0.5">
              <Zap className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h4 className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1">
                {labels[language].fact}
              </h4>
              <p className="text-indigo-100/80 text-sm italic font-medium">
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
            className="group/btn relative px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-pink-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-pink-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait overflow-hidden"
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
          <div className="bg-neutral-900 border border-pink-500/30 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-950/40 via-purple-900/20 to-pink-950/40">
              <div className="space-y-1">
                {detailedData?.kandaName && (
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em]">
                    {detailedData.kandaName}
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-cinzel text-sky-200">
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
                <div className="text-sky-100/80 text-lg md:text-xl leading-relaxed italic text-center p-6 bg-pink-500/5 rounded-2xl border border-pink-500/10">
                  {detailedData.description}
                </div>
              )}

              {detailedData?.shlokas?.length > 0 ? (
                <div className="space-y-12">
                  {detailedData.shlokas.map((s: any, i: number) => (
                    <div key={i} className="space-y-4 text-center">
                      <div className="text-pink-400 text-2xl md:text-3xl leading-relaxed font-semibold">
                        {s.shloka}
                      </div>
                      <div className="text-sky-200/60 text-base md:text-lg italic max-w-2xl mx-auto border-t border-pink-500/20 pt-4">
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
