import { NextRequest, NextResponse } from 'next/server';
import { ROUTES_DATA } from '@/lib/routesData';

// Priority model list
const MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
];

// Helper delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not defined in .env.local' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { routeId, season, groupSize, experienceLevel, healthNotes } = body;

    const selectedRoute = ROUTES_DATA.find((r) => r.id === routeId);

    if (!selectedRoute) {
      return NextResponse.json(
        { error: 'Invalid route selected.' },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert high-altitude safety and expedition risk evaluator for Gilgit-Baltistan, Pakistan.

Analyze the trekker's profile against the provided route data and return a JSON evaluation.

ROUTE DETAILS:
- Name: ${selectedRoute.name}
- Region: ${selectedRoute.region}
- Distance: ${selectedRoute.distanceKm} km
- Max Altitude: ${selectedRoute.maxAltitudeMeters} m
- Base Difficulty: ${selectedRoute.difficulty}
- Checkpoints: ${selectedRoute.checkpoints.map((c) => `${c.name} (${c.elevationMeters}m)`).join(', ')}
- Permits: Locals: "${selectedRoute.permitsRequired.locals}" | Foreigners: "${selectedRoute.permitsRequired.foreigners}"

TREKKER PROFILE:
- Planned Travel Date/Season: ${season || 'Not specified'}
- Group Size: ${groupSize || 1}
- Self-Reported Experience Level: ${experienceLevel || 'Beginner'}
- Health Considerations: ${healthNotes || 'None'}

INSTRUCTIONS:
Return strictly a valid JSON object matching this structure:
{
  "overallRiskLevel": "Low",
  "summary": "Short 2-sentence summary of overall safety outlook.",
  "hazards": {
    "altitude": { "level": "Low", "details": "Explanation of AMS/hypoxia risks" },
    "weather": { "level": "Low", "details": "Explanation of thermal hazards" },
    "terrain": { "level": "Low", "details": "Explanation of physical hazards" },
    "permits": { "level": "Low", "details": "Clear steps on paperwork needed" }
  },
  "redFlags": ["Specific warning 1", "Specific warning 2"],
  "packingChecklist": ["Essential item 1", "Essential item 2"],
  "prepChecklist": ["Preparation step 1", "Preparation step 2"]
}
`;

    let responseData: any = null;
    let lastError: any = null;

    // Retry loop across candidate models with exponential backoff on rate limits
    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' },
            }),
          });

          const data = await res.json();

          if (res.ok) {
            responseData = data;
            break;
          }

          lastError = data;

          // If rate limited or service overloaded, wait and retry
          if (res.status === 429 || res.status === 503) {
            console.warn(`Model ${model} hit rate limit/overload (status ${res.status}). Attempt ${attempt} of 3. Retrying...`);
            await delay(attempt * 2000); // Wait 2s, 4s...
            continue;
          }

          // Move to next model if 404
          break;
        } catch (err) {
          lastError = err;
          await delay(1000);
        }
      }

      if (responseData) break;
    }

    if (!responseData) {
      return NextResponse.json(
        { error: 'Rate limit or service overload encountered. Please wait a few seconds and try again.', details: lastError },
        { status: 429 }
      );
    }

    let textOutput = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    textOutput = textOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsedData = JSON.parse(textOutput);

    return NextResponse.json({ success: true, assessment: parsedData });
  } catch (error: any) {
    console.error('Error generating risk assessment:', error);
    return NextResponse.json(
      { error: 'Failed to process risk assessment.', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}