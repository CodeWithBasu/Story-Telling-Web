"use client"

import { useState, useEffect } from "react"
import { NarasimhaCard } from "@/components/NarasimhaCard"
import { narasimhaStory } from "@/data/narasimhaStory"
import LightRays from "@/components/ui/LightRays"
import BackgroundMusic from "@/components/ui/BackgroundMusic"
import { BookOpen, Home, Flame, Crown, Shield } from "lucide-react"
import Link from "next/link"

import { useIsTablet } from "@/hooks/use-mobile"

export default function NarasimhaPage() {
  const [progress, setProgress] = useState(0)
  const [language, setLanguage] = useState<'en' | 'hi' | 'or'>('en')
  const isTablet = useIsTablet()

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progressPercentage = (scrolled / documentHeight) * 100
      setProgress(Math.min(100, Math.max(0, progressPercentage)))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-amber-500/30">
      <BackgroundMusic src="/narasimha/bgm.mp3" initialVolume={0.05} />
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-black to-black z-0 pointer-events-none" />
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}
      />
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-950/50 to-transparent z-10 pointer-events-none" />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-900/50 z-50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-amber-800 via-orange-600 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-40 flex gap-2">
        <Link
          href="/"
          className="bg-black/40 hover:bg-amber-950/60 text-amber-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-amber-500/30 font-serif text-xs md:text-sm flex items-center gap-2 transition-all hover:scale-105 hover:border-amber-500/80 backdrop-blur-md shadow-xl group"
        >
          <Home className="w-3 h-3 md:w-4 md:h-4 text-amber-400 group-hover:text-amber-200" />
          <span className="hidden md:inline">Home</span>
          <span className="md:hidden"><Home className="w-4 h-4" /></span>
        </Link>
      </nav>

      {/* Language Switcher - Floating */}
      <div className="fixed top-4 left-4 z-40 bg-black/60 backdrop-blur-xl p-1 md:p-1.5 rounded-2xl border border-white/10 shadow-2xl flex gap-1 transform transition-all hover:scale-105 hover:border-amber-500/30">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'en' 
              ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg' 
              : 'text-gray-400 hover:text-amber-300 hover:bg-white/5'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'hi' 
              ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg' 
              : 'text-gray-400 hover:text-amber-300 hover:bg-white/5'
          }`}
        >
          हि
        </button>
        <button
          onClick={() => setLanguage('or')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'or' 
              ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg' 
              : 'text-gray-400 hover:text-amber-300 hover:bg-white/5'
          }`}
        >
          ଓଡ଼ି
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-12 md:pb-20 z-10 overflow-hidden">
        {/* Light Rays Effect */}
        <div className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 ${isTablet ? 'opacity-80' : 'opacity-60'}`}>
             <LightRays
                raysOrigin="top-center"
                raysColor="#d97706" 
                raysSpeed={0.15}
                lightSpread={isTablet ? 2.0 : 0.6}
                rayLength={isTablet ? 2.5 : 1.5}
                followMouse={!isTablet}
                mouseInfluence={0.2}
                className="w-full h-full mix-blend-screen"
            />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 md:mb-8 inline-block relative group cursor-default">
            <div className="absolute -inset-4 bg-amber-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
            <Flame className="w-12 h-12 md:w-20 md:h-20 text-amber-500 mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transform" />
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 font-serif tracking-tight relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-200 via-amber-500 to-orange-200 animate-gradient-x drop-shadow-sm leading-tight">
              {language === 'en' ? 'Narasimha: The Divine Protector' : language === 'hi' ? 'नृसिंह: दिव्य रक्षक' : 'ନୃସିଂହ: ଦିବ୍ୟ ରକ୍ଷକ'}
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50" />
          </h1>
          
          <p className="text-lg md:text-3xl text-amber-100/80 font-serif mb-4 md:mb-6 max-w-4xl mx-auto italic tracking-wide px-2">
            {language === 'en' ? 'The Fourth Avatar of Lord Vishnu' : language === 'hi' ? 'भगवान विष्णु का चौथा अवतार' : 'ଭଗବାନ ବିଷ୍ଣୁଙ୍କର ଚତୁର୍ଥ ଅବତାର'}
          </p>
          
          <p className="text-xs md:text-lg text-amber-200/60 max-w-2xl mx-auto leading-relaxed font-light tracking-wider uppercase px-4">
            {language === 'en' 
              ? 'Victory of Faith over Fear'
              : language === 'hi'
              ? 'भय पर आस्था की विजय'
              : 'ଭୟ ଉପରେ ବିଶ୍ୱାସର ବିଜୟ'}
          </p>
          
          {/* Story Stats */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-amber-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
              <span>{narasimhaStory.length} {language === 'en' ? 'Cards' : language === 'hi' ? 'कार्ड' : 'କାର୍ଡ'}</span>
            </div>
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-amber-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
               <span className="text-amber-500 text-xs md:text-base">🙏</span>
               <span>{language === 'en' ? 'Devotion' : language === 'hi' ? 'भक्ति' : 'ଭକ୍ତି'}</span>
            </div>
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-amber-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <span className="text-amber-500 text-xs md:text-base">🦁</span>
              <span>Ugra Rupa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Cards */}
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent -translate-x-1/2 hidden md:block" />
        {narasimhaStory.map((chapter, index) => (
          <NarasimhaCard
            key={chapter.id}
            title={chapter.title}
            meet={chapter.meet}
            place={chapter.place}
            image={chapter.image}
            story={chapter.story}
            fact={chapter.fact}
            index={index}
            language={language}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gradient-to-b from-black to-amber-950/20 py-20 mt-12 border-t border-amber-900/30">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-8 h-8 text-amber-500/50 mx-auto mb-6 animate-pulse" />
          <p className="text-2xl md:text-4xl text-amber-500/80 font-serif mb-4 drop-shadow-md">
             "उग्रं वीरं महाविष्णुं..."
          </p>
          <p className="text-amber-400/60 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
             {language === 'en' 
               ? 'I bow to Lord Narasimha, the ferocious and heroic...' 
               : language === 'hi' 
               ? 'मैं भगवान नृसिंह को नमन करता हूं, जो उग्र और वीर हैं...' 
               : 'ମୁଁ ଭଗବାନ ନୃସିଂହଙ୍କୁ ପ୍ରଣାମ କରୁଛି, ଯିଏ ଉଗ୍ର ଓ ବୀର...'}
          </p>
        </div>
      </div>
    </div>
  )
}
