import { error } from "console";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {jsonInput,prompt} = body;
        if (!jsonInput || !prompt){
            return NextResponse.json({error: "Missing essential data."},{status:400})
        }
        
        // validating json
        let parsedData
        try{
            parsedData = JSON.parse(jsonInput)
        }
        catch{
            return NextResponse.json({
                error: "Invalid JSON format."
            },{status:400})
        }
        // TEMPORARY MOCK RESPONSE
    const html = `
      <html>
        <body style="font-family: sans-serif; padding: 40px;">
          <h1>Generated Dashboard</h1>
          <pre>${JSON.stringify(parsedData, null, 2)}</pre>
          <p><strong>Description:</strong> ${prompt}</p>
        </body>
      </html>
    `;
    return NextResponse.json({html})
    }catch(error){
        return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
    }
}