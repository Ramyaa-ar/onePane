import { z } from "genkit";
import { ai } from "../genkit";

export const dashboardFlow = ai.defineFlow(
  {
    name: "dashboardFlow",
    inputSchema: z.object({
      jsonData: z.record(z.any()),
      userPrompt: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const systemInstruction = `
You are a professional frontend developer.

Rules:
- Output ONLY valid HTML.
- Do NOT explain anything.
- Do NOT wrap in markdown.
- Use inline CSS.
- Use the JSON data exactly.
- Do NOT hallucinate values.
`;

    const prompt = `
JSON Data:
${JSON.stringify(input.jsonData, null, 2)}

User Instructions:
${input.userPrompt}
`;

    const response = await ai.generate({
      system: systemInstruction,
      prompt,
    });

    return response.text; // ✅ FIXED
  }
);
