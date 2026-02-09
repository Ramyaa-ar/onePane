import { NextResponse } from "next/server";
import { dashboardFlow } from "@/lib/flows/dashboardAiFlow";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jsonInput, prompt } = body;
    if (!jsonInput || !prompt) {
      return NextResponse.json({ error: "Missing essential data." }, { status: 400 });
    }

    // validating json
    let parsedData;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON format.",
        },
        { status: 400 }
      );
    }

    const html = await dashboardFlow({ jsonData: parsedData, userPrompt: prompt });
    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "AI did not return valid HTML." },
        { status: 500 }
      );
    }
    return NextResponse.json({ html });
  } catch (err: any) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}