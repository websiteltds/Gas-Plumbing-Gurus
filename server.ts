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

// Google Calendar Booking & Dispatch Integration
app.post("/api/calendar/add-event", async (req, res) => {
  try {
    const { 
      name, 
      phone, 
      email, 
      address, 
      postcode, 
      serviceType, 
      urgency, 
      preferredDateTime, 
      description,
      accessToken 
    } = req.body;

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized. Google Access Token is required." });
    }

    // Call Gemini to convert preferred arrival date/time and urgency into standard ISO-8601 start and end times
    const currentISO = new Date().toISOString();
    const prompt = `Convert the following plumbing appointment booking preferred time or description into a structured JSON with "start" (ISO 8601 string in Europe/London timezone) and "end" (ISO 8601 string in Europe/London timezone, typically 1 hour after start).
Current local time: ${currentISO} (Europe/London timezone).
User Preferred Time input: "${preferredDateTime}"
Urgency level: "${urgency}"

Rules:
1. If the preferred time is "Immediate Emergency Dispatch", "As soon as possible", or similar immediate callout, set start time to current time and end to 1 hour later.
2. If the user specifies a particular day (e.g., "Tomorrow at 10am", "this Saturday", "next Monday at 2pm"), compute that date relative to current time.
3. If no year is mentioned, assume 2026.
4. Output MUST be ONLY a valid raw JSON object matching this structure:
{
  "start": "2026-07-10T10:00:00+01:00",
  "end": "2026-07-10T11:00:00+01:00"
}
Do not include any markdown formatting or explanation, just the raw JSON.`;

    let startISO = currentISO;
    let endISO = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    try {
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const responseText = geminiResponse.text?.trim() || "";
      // Clean markdown code blocks if any
      const cleanedJSONStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanedJSONStr);
      if (parsed.start && parsed.end) {
        startISO = parsed.start;
        endISO = parsed.end;
      }
    } catch (parseError) {
      console.error("Gemini Date Parsing Error (using fallback):", parseError);
    }

    // Call Google Calendar API to insert the event
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        summary: `Gurus Plumbing: ${serviceType} - ${name}`,
        location: `${address}, ${postcode}`,
        description: `--- NEW GURUS PLUMBING BOOKING ALERT ---\n\nCustomer Name: ${name}\nPhone Number: ${phone}\nEmail Address: ${email}\nSelected Service: ${serviceType}\nUrgency Level: ${urgency.toUpperCase()}\nPreferred Time: ${preferredDateTime}\n\nAdditional Notes: ${description || 'N/A'}\n\nGenerated via Gas & Plumbing Gurus Portal.`,
        start: {
          dateTime: startISO,
          timeZone: 'Europe/London'
        },
        end: {
          dateTime: endISO,
          timeZone: 'Europe/London'
        },
        attendees: [
          { email: 'gasplumbinggurus@gmail.com' },
          { email: email }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Google Calendar API Error Details:", data);
      return res.status(response.status).json({ 
        error: data.error?.message || "Failed to create Google Calendar event." 
      });
    }

    res.json({ success: true, event: data });
  } catch (error: any) {
    console.error("Calendar Booking Error:", error);
    res.status(500).json({ error: error.message || "Internal server error during booking." });
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
