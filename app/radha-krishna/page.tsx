
"use client"

import { useState, useEffect } from "react"
import { RadhaKrishnaCard } from "@/components/RadhaKrishnaCard"
import { radhaKrishnaStory } from "@/data/radhaKrishnaStory"
import LightRays from "@/components/ui/LightRays"
import BackgroundMusic from "@/components/ui/BackgroundMusic"
import { BookOpen, Home, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

import { useIsTablet } from "@/hooks/use-mobile"

export default function RadhaKrishnaPage() {
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
    <div className="min-h-screen bg-black font-sans selection:bg-pink-500/30">
      <BackgroundMusic src="/radha-krishna/bgm.mp3" initialVolume={0.05} />
      {/* Background Ambience */}
      {/* Background Ambience - Peacock Theme */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#0c4a6e_25%,_#0f766e_50%,_#020617_100%)] overflow-hidden" />
      
      {/* Peacock Eye Abstract Gradients */}
      <div className="fixed inset-0 -z-15 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_#fbbf24_0%,_#10b981_20%,_#1e3a8a_40%,_transparent_70%)] opacity-20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_#d946ef_0%,_#7e22ce_30%,_transparent_70%)] opacity-10 blur-[100px]" />
      </div>


      
      {/* Stardust/Sparkles */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen animate-pulse"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-950/50 to-transparent z-10 pointer-events-none" />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-900/50 z-50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-40 flex gap-2">
        <Link
          href="/"
          className="bg-black/40 hover:bg-sky-950/60 text-sky-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-sky-500/30 font-serif text-xs md:text-sm flex items-center gap-2 transition-all hover:scale-105 hover:border-sky-500/80 backdrop-blur-md shadow-xl group"
        >
          <Home className="w-3 h-3 md:w-4 md:h-4 text-sky-400 group-hover:text-sky-200" />
          <span className="hidden md:inline">Home</span>
          <span className="md:hidden"><Home className="w-4 h-4" /></span>
        </Link>
      </nav>

      {/* Language Switcher - Floating */}
      <div className="fixed top-4 left-4 z-40 bg-black/60 backdrop-blur-xl p-1 md:p-1.5 rounded-2xl border border-white/10 shadow-2xl flex gap-1 transform transition-all hover:scale-105 hover:border-sky-500/30">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'en' 
              ? 'bg-gradient-to-r from-sky-600 to-pink-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'hi' 
              ? 'bg-gradient-to-r from-sky-600 to-pink-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
          }`}
        >
          हि
        </button>
        <button
          onClick={() => setLanguage('or')}
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
            language === 'or' 
              ? 'bg-gradient-to-r from-sky-600 to-pink-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
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
                raysColor="#f0abfc" 
                raysSpeed={0.2}
                lightSpread={isTablet ? 2.0 : 0.6}
                rayLength={isTablet ? 2.5 : 1.5}
                followMouse={!isTablet}
                mouseInfluence={0.2}
                className="w-full h-full"
            />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 md:mb-8 inline-block relative group cursor-default">
            <div className="absolute -inset-4 bg-pink-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
            <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-pink-400 mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          </div>
          
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6 font-cinzel tracking-tight relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-pink-400 to-purple-300 animate-gradient-x drop-shadow-sm leading-tight">
              {language === 'en' ? 'Radha Krishna' : language === 'hi' ? 'राधा कृष्ण' : 'ରାଧା କୃଷ୍ଣ'}
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 md:w-32 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
          </h1>
          
          <p className="text-lg md:text-4xl text-sky-100/90 font-great-vibes mb-4 md:mb-6 max-w-4xl mx-auto tracking-wide px-2">
            {language === 'en' ? 'The Divine Tale of Eternal Love' : language === 'hi' ? 'शाश्वत प्रेम की दिव्य कथा' : 'ଅମର ପ୍ରେମର ଦିବ୍ୟ କାହାଣୀ'}
          </p>
          
          <p className="text-xs md:text-lg text-sky-200/60 max-w-2xl mx-auto leading-relaxed font-light tracking-wider uppercase px-4">
            {language === 'en' 
              ? 'Journey through devotion, joy, and divine union'
              : language === 'hi'
              ? 'भक्ति, आनंद और दिव्य मिलन की यात्रा'
              : 'ଭକ୍ତି, ଆନନ୍ଦ ଏବଂ ଦିବ୍ୟ ମିଳନର ଯାତ୍ରା'}
          </p>
          
          {/* Story Stats */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-sky-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-pink-400" />
              <span>{radhaKrishnaStory.length} {language === 'en' ? 'Stories' : language === 'hi' ? 'कहानियां' : 'କାହାଣୀ'}</span>
            </div>
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-sky-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
               <span className="text-pink-400 text-xs md:text-base">❤️</span>
               <span>{language === 'en' ? 'Eternal Love' : language === 'hi' ? 'अमर प्रेम' : 'ଅମର ପ୍ରେମ'}</span>
            </div>
            <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-sm text-sky-100/80 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <span className="text-pink-400 text-xs md:text-base">✨</span>
              <span>{language === 'en' ? 'Divine Play' : language === 'hi' ? 'दिव्य लीला' : 'ଦିବ୍ୟ ଲୀଳା'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Cards */}
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-pink-500/20 to-transparent -translate-x-1/2 hidden md:block" />
        {radhaKrishnaStory.map((chapter, index) => (
          <RadhaKrishnaCard
            key={chapter.id}
            title={chapter.title}
            meet={chapter.meet}
            place={chapter.place}
            year={chapter.year}
            image={chapter.image}
            story={chapter.story}
            fact={chapter.fact}
            index={index}
            language={language}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gradient-to-b from-black to-purple-950/20 py-20 mt-12 border-t border-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-8 h-8 text-pink-500/50 mx-auto mb-6 animate-pulse" />
          <p className="text-4xl md:text-6xl text-pink-500/80 font-great-vibes mb-4 drop-shadow-md">
             "राधे राधे"
          </p>
          <p className="text-purple-400/60 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
             {language === 'en' 
               ? 'Where there is Love, there is Life' 
               : language === 'hi' 
               ? 'जहां प्रेम है, वहां जीवन है' 
               : 'ଯେଉଁଠାରେ ପ୍ରେମ ଅଛି, ସେଠାରେ ଜୀବନ ଅଛି'}
          </p>
        </div>
      </div>
    </div>
  )
}

