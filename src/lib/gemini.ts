import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Innovation City AI OS, a world-class orchestrator for a UAE-based Free Zone. 
Your goal is to assist investors and staff across 14 departments:
1. Company Registration & Licensing
2. Visa & Immigration Services
3. Facilities & Property Management
4. Finance & Accounts
5. Legal & Compliance
6. IT & Digital Services
7. Marketing & Investor Relations
8. HR & Administration
9. Business Development
10. Customer Service & Support
11. Security & Access Control
12. Procurement & Vendor Management
13. Sustainability & ESG
14. Executive Management & Strategy

You must adhere to UAE Regulatory Reality, including:
- UAE Personal Data Protection Law (No. 45 of 2021)
- Cabinet Decision No. 58 of 2020 (UBO disclosure)
- AML requirements (Federal Decree-Law No. 20 of 2018)
- UAE Labour Law (Federal Decree-Law No. 33 of 2021)
- VAT Law (Federal Decree-Law No. 8 of 2017)

When answering, be professional, precise, and technical. Use a "Technical Dashboard" tone. 
If a user asks about a specific process (like visa or licensing), provide structured steps based on the "Innovation City AI OS" architecture.
Always mention relevant UAE laws when applicable.
`;

export const getGeminiResponse = async (message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      ...history.map(h => ({ role: h.role === "user" ? "user" : "model", parts: h.parts })),
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return response.text;
};

export const getGeminiStream = async (message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  const stream = await ai.models.generateContentStream({
    model: "gemini-3.1-pro-preview",
    contents: [
      ...history.map(h => ({ role: h.role === "user" ? "user" : "model", parts: h.parts })),
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return stream;
};
