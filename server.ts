/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Gemini client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are "Guru Bot", the official friendly virtual AI assistant for Gas & Plumbing Gurus LTD. 
Your goal is to assist customers, answer plumbing/heating questions, check service areas, and gently guide them to book a plumber or call us for emergencies.

Key Information about Gas & Plumbing Gurus LTD:
- Services: 24/7 Emergency plumbing, leak isolation, boiler repairs & servicing, radiator maintenance, Gas Safe gas/heating installations, toilet/drain unblocking, tap/pipe repairs.
- Core base: Brixton Hill (SW2), London.
- Areas served: Rapid 24/7 arrival strictly within a 10-mile radius of SW2 (Brixton Hill). If a customer asks about any area outside of this 10-mile radius (such as East Midlands, Manchester, Switzerland, America, etc.), you MUST answer "No, we do not serve there. We only serve within a 10-mile radius of SW2".
- Urgent emergency? Tell them to call our on-call engineer immediately at 07421 495104 or submit the booking form.
- Gas Safe ID: #618290 (Crucial trust signal for boiler/gas work).
- Pricing: No call-out fee. Transparent estimates provided on-site for approval before work begins.
- Tone: Extremely helpful, polite, professional, and clear. Avoid overly technical jargon; explain simply. Keep responses relatively short and direct.

If a customer asks about active emergency help, remind them to call 07421 495104 directly for immediate engineer dispatch!`;

    // Map history to the required format for Gemini Chat API
    // The history parameter is an array of { role: 'user' | 'model', text: string }
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Start chat with history
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Sorry, I am having trouble connecting to my brain right now. Please call us directly at 07421 495104 or try again!" 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
