"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";


export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const handleGenerate = async () => {
    try {
      setError("");
      setLoading(true);
      if (!jsonInput.trim()) throw new Error("Please provide JSON data.");
      JSON.parse(jsonInput);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonInput, prompt }),
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setHtmlOutput(data.html);
    } catch (error: any) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Bridge AI
          </h1>
          <p className="text-zinc-600 mt-2">
            Transform raw JSON into beautiful dashboards instantly.
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 shadow-xl">


          <CardContent className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                JSON Input
              </label>
              <Textarea
                placeholder="Paste your JSON data here..."
                className="min-h-[200px] font-mono"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Dashboard Description
              </label>
              <Input
                placeholder="Describe how you want the dashboard..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <div className="flex justify-center">
              <Button size="lg" className="px-8" onClick={handleGenerate} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Generate Dashboard"
                )}
              </Button>


            </div>


          </CardContent>
        </Card>

        {htmlOutput && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                sandbox=""
                srcDoc={htmlOutput}
                className="w-full h-[500px] border rounded-md bg-white"
              />
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}
