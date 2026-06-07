# Google AI Agent Integration Guide

This guide will help you integrate your AI agent (built in Google AI Studio/Opal) into the **Story Telling Web** project. This will allow users to ask questions about mythological stories and get intelligent responses.

## 1. Prerequisites

- Your AI Agent's **Model Name** or **Tuned Model ID** from Google AI Studio.
- A **Google Gemini API Key**.
- [Optional] System instructions or context you've already defined for your mythological expert.

---

## 2. Step-by-Step Implementation

### Step 1: Environment Setup

Add your API key to your `.env.local` file to keep it secure.

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### Step 2: Install Google Generative AI SDK

Run the following command in your terminal:

```bash
npm install @google/generative-ai
```

### Step 3: Create an API Route (Server Side)

To keep your API key secure, create a route handler at `app/api/chat/route.ts`.

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Access your specific agent/model
    // If you have a tuned model, use that ID here
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Replace with your agent model name
      systemInstruction:
        "You are an expert in Indian Mythology. Answer questions about Ramayan, Mahabharat, and other sacred texts with wisdom and respect.",
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Agent Error:", error);
    return NextResponse.json(
      { error: "Failed to get response from Agent" },
      { status: 500 },
    );
  }
}
```

### Step 4: Create the Chat Component

Create a new component at `components/MythologyAgent.tsx` for the UI.

```tsx
"use client";

import { useState } from "react";
import { MessageCircle, Send, X, Bot } from "lucide-react";

export default function MythologyAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input, history: [] }), // Add history logic if needed
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I am unable to connect to the divine knowledge right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-110 transition-all group"
        >
          <Bot className="w-6 h-6 text-white" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-amber-500/30">
            Ask the Divine Agent
          </span>
        </button>
      ) : (
        <div className="bg-zinc-900 border border-amber-500/30 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-amber-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif text-amber-100 font-bold">
                Mythology Guide
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.length === 0 && (
              <p className="text-zinc-500 text-sm text-center italic mt-10">
                "Ask me anything about the great epics..."
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-amber-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-amber-100 border border-amber-500/10 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-amber-500 text-xs animate-pulse">
                Seeking wisdom...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-amber-500/20 bg-zinc-900">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your question..."
                className="flex-1 bg-black border border-amber-500/20 rounded-xl px-4 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={sendMessage}
                className="bg-amber-600 p-2 rounded-xl hover:bg-amber-500 transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Step 5: Add to Layout

Open `app/layout.tsx` and add the component so it appears on all pages.

```tsx
import MythologyAgent from "@/components/MythologyAgent"; // Import here

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MythologyAgent /> {/* Add here */}
      </body>
    </html>
  );
}
```

## Summary

By following these steps, you have:

1. Created a secure backend connection to your Google AI Agent.
2. Built a premium, themed UI for users to interact with.
3. Integrated the agent globally across your storytelling platform.

> [!TIP]
> Make sure to update the `systemInstruction` in the API route to match the exact personality and knowledge base of your agent!
