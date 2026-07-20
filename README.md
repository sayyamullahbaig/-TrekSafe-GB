# TrekSafe GB
> *An AI-powered high-altitude safety and expedition risk evaluation platform tailored for Gilgit-Baltistan, Pakistan.*

---

## Overview

### What the Application Does
**TrekSafe GB** is an intelligent safety evaluation platform designed to assess, analyze, and mitigate risks for high-altitude trekking and mountaineering expeditions across the Gilgit-Baltistan region of Pakistan. By cross-referencing route topographies, elevation profiles, weather hazards, and permit requirements with a trekker's individual experience level and health parameters, TrekSafe GB produces granular, actionable risk assessments and tailored preparation checklists.

### Real-World Problem Solved
High-altitude trekking in the Karakoram and Himalayan ranges (e.g., K2 Base Camp, Concordia, Rush Lake, Fairy Meadows) involves extreme physiological hazards, rapidly changing alpine weather, physical terrain challenges, and complex permit regulations for local and international tourists. Trekkers often lack a unified, intelligent system to gauge whether a specific route matches their personal physical readiness and health profile, leading to severe issues like Acute Mountain Sickness (AMS), thermal injury, or logistical stalling.

### Target Users
* **High-Altitude Trekkers & Mountaineers:** Beginners to seasoned mountaineers seeking personalized risk profiles and gear lists.
* **Tour Operators & Expedition Leaders:** Outdoor guides requiring fast, structured safety overviews and permit compliance checks for client groups.
* **Regional Tourism & Rescue Coordinators:** Organizations looking to promote standardized, tech-enabled safety awareness across remote mountain routes.

### Why This Solution is Useful
Instead of relying on fragmented forum posts or static guidebooks, users obtain real-time, personalized risk diagnostics. The platform uses structural AI processing to translate environmental data and user physical profiles into clear hazard tiers, explicit warnings, and actionable pre-departure checklists.

---

## Live Demo

* **Deployed Application:** [https://treksafe-gb.vercel.app](https://treksafe-gb.vercel.app)
* **Status:** Live & Accessible. Users can test expedition risk generation instantly without requiring initial registration.

---

## Features

### 1. User Interface & User Experience
* **Modern High-Contrast Design:** Optimized using Next.js 14 and Tailwind CSS with high visibility for outdoor environments.
* **Interactive Route Selector:** Integrated dynamic route browsing based on regional data (`ROUTES_DATA`).
* **Responsive Multi-Step Assessment Form:** Seamless input experience across mobile, tablet, and desktop viewports.

### 2. AI Safety Assessment Engine
* **Multivariate Risk Modeling:** Evaluates individual factors (group size, experience, season, health conditions) against physical route metrics (max elevation, length, checkpoints).
* **Structured Hazard Breakdown:** Generates individual risk levels ("Low", "Moderate", "High", "Critical") across four core pillars: *Altitude*, *Weather*, *Terrain*, and *Permit Logistics*.
* **Dynamic Packing & Preparation Lists:** Generates tailored equipment and preparation steps based on winter vs. summer conditions and user-reported medical notes.

### 3. Data & State Management
* **Centralized Route Knowledgebase:** Modular TypeScript data definitions representing routes, checkpoints, and localized permit requirements.
* **Strict Schema Parsing:** Enforces structured JSON output parsing from the generative backend to prevent UI render failures.

### 4. Resiliency & Error Handling
* **Automated Model Fallbacks:** Built-in multi-model fallback chain (`gemini-3.5-flash`, `gemini-3.1-flash-lite`) to bypass regional model availability updates.
* **Exponential Backoff Strategy:** Gracefully handles API rate limits (`429 RESOURCE_EXHAUSTED`) and temporary server overloads (`503 UNAVAILABLE`) with retry delays.
* **Sanitized Parsing:** Automatically strips extraneous markdown backticks or malformed JSON blocks before client delivery.

---

## AI Feature

### AI System Architecture & Workflow
The core intelligence of TrekSafe GB relies on Google Gemini's structured output capabilities. The backend formats route context and user-submitted health and experience data into a system prompt that mandates strict structural JSON compliance.

#### User Workflow
```text
[User Selects Route & Inputs Profile] 
               │
               ▼
   [POST /api/assess-risk]
               │
               ▼
[Prompt Construction + Route Binding]
               │
               ▼
 [Gemini API (with Fallback & Retry)]
               │
               ▼
 [JSON Parsing & Markdown Sanitization]
               │
               ▼
[Structured Assessment Rendered on UI]

## Input and Output

### Input: Selected route object ID, planned travel season, group size, experience level ("Beginner", "Intermediate", "Advanced"), and
optional health notes (e.g., past asthma, history of altitude sickness).

### Output: Validated JSON containing an overall risk rating, two-sentence safety outlook, specific hazard metrics, red-flag warnings,
and customized preparation/packing lists.

## Model Parameters & Strategy

### Model: gemini-3.5-flash (Primary) with fallback to gemini-3.1-flash-lite.

### Temperature: 0.2 (Low temperature configured via strict JSON system instructions to prioritize factual safety guidelines over creative text generation).
### Prompt Engineering Strategy: Few-shot structural framing paired with explicit schema definition and zero-trust input validation.

## Complete AI System Prompt /
InstructionsPlaintextYou are an expert high-altitude safety and expedition risk evaluator for Gilgit-Baltistan, Pakistan.

Analyze the trekker's profile against the provided route data and return a JSON evaluation.

## ROUTE DETAILS:
- Name: ${selectedRoute.name}
- Region: ${selectedRoute.region}
- Distance: ${selectedRoute.distanceKm} km
- Max Altitude: ${selectedRoute.maxAltitudeMeters} m
- Base Difficulty: ${selectedRoute.difficulty}
- Checkpoints: ${selectedRoute.checkpoints.map((c) => `${c.name} (${c.elevationMeters}m)`).join(', ')}
- Permits: Locals: "${selectedRoute.permitsRequired.locals}" | Foreigners: "${selectedRoute.permitsRequired.foreigners}"

## TREKKER PROFILE:
- Planned Travel Date/Season: ${season || 'Not specified'}
- Group Size: ${groupSize || 1}
- Self-Reported Experience Level: ${experienceLevel || 'Beginner'}
- Health Considerations: ${healthNotes || 'None'}

## INSTRUCTIONS:
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
Technology StackCategoryTechnology / ToolUsage in ProjectFrontend FrameworkNext.js 14 (App Router)Server-rendered pages, API routes, and React componentsProgramming LanguageTypeScriptEnd-to-end static typing for route data and API payloadsStylingTailwind CSS / Lucide ReactModern utility-first layout design and UI iconsBackend & RoutingNext.js Serverless APIHandles /api/assess-risk endpoints and secret keysAI IntegrationGoogle Gemini REST APIGenerative content generation and structured JSON risk parsingHosting & DeploymentVercelGlobal CDN deployment with automated CI/CD buildsVersion ControlGit & GitHubSource code tracking and collaborative developmentArchitecture /

## WorkflowPlaintext

┌─────────────────────────────────────────────────────────┐
│                      Client Browser                     │
│   (User submits route parameters & health inputs)       │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ POST /api/assess-risk
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js API Route                     │
│   1. Validates request payload against ROUTES_DATA      │
│   2. Constructs prompt with localized region data        │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ REST API Fetch
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Google Gemini API Engine                │
│   1. Executes query against gemini-3.5-flash            │
│   2. Fallback to gemini-3.1-flash-lite on 503/429       │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ Raw Response String
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js API Route                     │
│   1. Strips markdown backticks (```json)                 │
│   2. Validates JSON structure                           │
│   3. Returns structured JSON to Client                  │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ JSON Response
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      Client Browser                     │
│   Renders risk dials, hazard cards, & checklists        │
└────────────────────────────┴────────────────────────────┘
## Screenshots
### 1. Trip & Trekker Profile 
<img width="1030" height="640" alt="Empty Form" src="https://github.com/user-attachments/assets/84b45849-cc19-448a-ac26-129afe214aa4" />

### 2. AI Risk Pipeline Processing
<img width="1019" height="622" alt="In Action" src="https://github.com/user-attachments/assets/c767fd54-882f-4117-9311-6b36b4231b59" />

### 3. Generated AI Risk Evaluation Report
<img width="828" height="646" alt="Good Response" src="https://github.com/user-attachments/assets/80fe221b-af11-4c15-8ea7-9def1c20d83e" />

Folder Structure
Plaintext
treksafe-gb/
├── app/
│   ├── api/
│   │   └── assess-risk/
│   │       └── route.ts         # Serverless endpoint for Gemini integration
│   ├── favicon.ico
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout wrapper
│   └── page.tsx                 # Main application page & form UI
├── components/
│   ├── HazardCard.tsx           # UI component for individual hazard metrics
│   ├── Navbar.tsx               # Application header and branding
│   └── RiskReport.tsx           # Rendered safety report component
├── lib/
│   └── routesData.ts            # Route database (elevations, checkpoints, permits)
├── public/
│   └── images/                  # Screenshot assets
│       ├── Empty Form.png
│       ├── Good Response.png
│       └── In Action.png
├── .env.local                   # Environment configuration (ignored in git)
├── next.config.mjs              # Next.js configuration settings
├── package.json                 # Node dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS theme configuration
└── tsconfig.json                # TypeScript compiler configuration
Usage
Select a Route: Choose a destination route from the dropdown (e.g., Fairy Meadows & Nanga Parbat Base Camp, K2 Base Camp, Rush Peak).

Specify Season & Group Details: Enter the intended travel month/season and total group size.

Set Experience Level: Choose your high-altitude experience level (Beginner, Intermediate, Advanced).

Input Health & Medical Context: Add any relevant medical notes (e.g., mild asthma, knee issues, previous altitude sickness).

Generate Safety Report: Click Generate Safety & Risk Report 🚀. The application processes the request through the API pipeline and renders the formatted risk report.

Future Improvements
Live Weather API Integration: Connect real-time mountain forecast data (e.g., OpenWeatherMap or Meteoblue alpine models) directly into the prompt context.

Offline PWA Support: Enable offline caching for generated safety reports and emergency offline contact cards for remote mountain regions without cell connectivity.

PDF Export Functionality: Provide a one-click PDF export feature so guides can print risk reports for local checkposts and tour groups.

Interactive Map Layer: Integrate Mapbox/Leaflet to visualize elevation profiles and checkpoint coordinates directly on an interactive 3D terrain map.

Challenges Faced & Solutions
1. Model Deprecation and API Endpoint Shifts
Challenge: Earlier iterations relied on gemini-1.5-flash and gemini-2.5-flash, which experienced deprecation or model availability shifts, yielding 404 NOT_FOUND errors.

Solution: Upgraded the request pipeline to active gemini-3.5-flash endpoints while adding a dynamic model fallback array to keep the application resilient against upstream changes.
