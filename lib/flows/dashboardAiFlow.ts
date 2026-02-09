import { z } from "genkit";
import { ai } from "../genkit";
import { error } from "console";

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
You are an expert Frontend Developer.

Your goal is to generate a stunning, professional, and fully functional one-page dashboard preview.

Strict Rules:
- Output ONLY valid HTML.
- Start directly with <!DOCTYPE html> or <div>.
- Do NOT include markdown formatting.
- Do NOT include explanations or comments.
- Do NOT include <script> tags.
- Do NOT use external libraries or CDNs.
- Use inline styles or embedded <style> tags only.
- Use ONLY the provided JSON data.
- Do NOT hallucinate or invent values.
- Ensure totals and displayed numbers exactly match the JSON.
- Make the UI modern, responsive, and premium.
`;

        const prompt = `
JSON Data:
${JSON.stringify(input.jsonData, null, 2)}

User Request:
${input.userPrompt}

Generate the complete HTML and CSS for this dashboard.
`;

        const response = await ai.generate({
            system: systemInstruction,
            prompt,
            config: {
                temperature: 0.2,
            }
        });
        if(!response.text){
            throw new Error("AI did not return valid html")
        }
        return response.text;
    }
);
