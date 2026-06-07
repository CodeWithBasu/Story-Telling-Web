"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, Bot, Sparkles, User, MessageSquare } from "lucide-react"

export default function MythologyAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { role: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: history }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.details || data.error);
      }

      setMessages(prev => [...prev, { role: "model" as const, text: data.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: "model" as const, 
        text: `The connection to the celestial realms failed: ${err.message}. Please verify your API key and refresh to try again.` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-4 rounded-2xl shadow-[0_10px_40px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_50px_rgba(234,88,12,0.6)] hover:scale-105 transition-all duration-300 border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Bot className="w-7 h-7 text-white drop-shadow-md" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-zinc-900/90 backdrop-blur-md text-amber-100 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-amber-500/30 shadow-2xl">
            Ask the Divine Agent
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-zinc-950 border border-amber-500/30 w-[90vw] md:w-[400px] h-[550px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-300">
          
          {/* Decorative Top Line */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600" />

          {/* Header */}
          <div className="p-5 bg-zinc-900/50 backdrop-blur-xl border-b border-amber-500/10 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-10">
                <Sparkles className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-cinzel text-amber-100 font-bold text-sm tracking-widest uppercase">RADHA</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[10px] text-zinc-400 font-medium">Celestial Guide Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-fixed"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-6">
                <div className="p-4 bg-amber-500/5 rounded-full border border-amber-500/10">
                   <MessageSquare className="w-8 h-8 text-amber-500/40" />
                </div>
                <div>
                    <p className="text-amber-100/90 font-serif text-lg italic">"Greetings, seeker of knowledge."</p>
                    <p className="text-zinc-500 text-xs mt-2 leading-relaxed">Ask me about the legends of Ramayan, the wisdom of Mahabharat, or the glory of Lord Narasimha.</p>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className="flex flex-col max-w-[85%] gap-1.5">
                    <div className={`flex items-center gap-2 mb-1 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'model' ? <Bot className="w-3 h-3 text-amber-500" /> : <User className="w-3 h-3 text-zinc-500" />}
                        <span className="text-[9px] uppercase tracking-tighter text-zinc-500 font-bold">
                            {m.role === 'user' ? 'You' : 'RADHA'}
                        </span>
                    </div>
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                    m.role === 'user' 
                        ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-tr-none border border-white/10' 
                        : 'bg-zinc-900 text-amber-50/90 border border-amber-500/10 rounded-tl-none font-serif'
                    }`}>
                    {m.text}
                    </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-zinc-900 border border-amber-500/10 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-zinc-900/50 backdrop-blur-xl border-t border-amber-500/10">
            <div className="flex gap-3 items-center bg-black/50 border border-white/5 p-1.5 rounded-2xl focus-within:border-amber-500/50 transition-all group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask your question..."
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-zinc-600"
              />
              <button 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all shadow-lg"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-[9px] text-zinc-600 text-center mt-3 font-medium uppercase tracking-[0.1em]">Divine Knowledge Assistant • Powered by Gemini</p>
          </div>
        </div>
      )}
    </div>
  )
}
