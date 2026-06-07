import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Configuration for the mythology expert
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      systemInstruction: "You are RADHA, an expert in Indian Mythology and a guide for this Story Telling Web project. You answer questions about Ramayan, Mahabharat, Radha Krishna, and Narasimha with immense wisdom, respect, and storytelling flair. Always maintain a divine and helpful persona.",
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AGENT API ERROR:", error.message || error);
    // Return detailed error message in JSON to help debug
    return NextResponse.json({ 
      error: "Celestial Connection Error", 
      details: error.message || "Unknown error" 
    }, { status: 500 });
  }
}
