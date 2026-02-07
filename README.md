# Bridge AI - Instant Dashboard Generator

A simple web application that acts as a "bridge" between raw data (JSON) and a visual interface. It uses an AI model (Google Gemini) to instantly generate a functional, one-page dashboard preview.

## Features
- **JSON Input**: Provide any structured raw data.
- **Natural Language Prompting**: Describe how you want the dashboard to look.
- **Instant Preview**: View the generated dashboard in a secure iframe.
- **Modern UI**: Built with Next.js and Tailwind CSS for a premium experience.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS.
- **Backend**: Next.js API Routes.
- **AI**: [Google Gemini Pro (gemini-1.5-flash)](https://ai.google.dev/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000] with your browser to see the result.

## How it Works

1. **Input**: User enters JSON data and a design prompt.
2. **Process**: The app sends the data and prompt to Gemini with a specialized system instruction.
3. **Output**: Gemini returns raw HTML/CSS code, which is rendered in the preview pane.

## Error Handling

- Validates JSON format before sending to the API.
- Handles API errors gracefully with user-friendly messages.
