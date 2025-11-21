import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// We use the environment variable as per instructions.
// It is assumed process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAnswer = async (question: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY not found in environment variables.");
    }

    const modelId = 'gemini-2.5-flash';
    
    // System instruction to guide the model's behavior
    const systemInstruction = "You are an intelligent NLP Question-Answering assistant. Provide clear, concise, and accurate answers to the user's questions. Format your response using Markdown.";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balanced creativity and accuracy
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No response generated from the model.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Enhance error message for UI
    if (error.message?.includes("API key")) {
       throw new Error("Invalid or missing API Key. Please check your configuration.");
    }
    throw error;
  }
};
