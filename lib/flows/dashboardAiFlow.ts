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
You are an expert Frontend Developer. Your goal is to create a stunning, professional, and functional one-page dashboard preview.

Rules:
- Output ONLY valid HTML with inline or embedded <style> tags.
- Do NOT include any markdown formatting (no \`\`\`html wrappers).
- Use clean, modern UI design (e.g., gradients, shadows, responsive layouts).
- Use the provided JSON data to populate the dashboard accurately.
- Do NOT hallucinate data. Ensure numbers and charts reflect the actual input.
- Make it look premium, like a high-end business application.
- If charts are needed and you don't use a library, represent data with styled divs or SVG.
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
        console.log("Out from dashboard flow:", response.text)
        return response.text;
    }
);
