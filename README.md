# TrekSafe GB
> *An AI-powered high-altitude safety and expedition risk evaluation platform tailored for Gilgit-Baltistan, Pakistan.*

---

## Overview

### App Name
**TrekSafe GB**

### What the Application Does
TrekSafe GB is an intelligent safety evaluation platform designed to assess, analyze, and mitigate risks for high-altitude trekking and mountaineering expeditions across the Gilgit-Baltistan region of Pakistan. By cross-referencing route topographies, elevation profiles, weather hazards, and permit requirements with a trekker's individual experience level and health parameters, TrekSafe GB produces granular, actionable risk assessments and tailored preparation checklists.

### The Real Problem Solved
High-altitude trekking in the Karakoram and Himalayan ranges (e.g., K2 Base Camp, Concordia, Rush Lake, Fairy Meadows) involves extreme physiological hazards, rapidly changing alpine weather, physical terrain challenges, and complex permit regulations for local and international tourists. Trekkers often lack a unified, intelligent system to gauge whether a specific route matches their personal physical readiness and health profile, leading to severe issues like Acute Mountain Sickness (AMS), thermal injury, or logistical stalling.

### Target Audience
* **High-Altitude Trekkers & Mountaineers:** Beginners to seasoned mountaineers seeking personalized risk profiles and gear lists.
* **Tour Operators & Expedition Leaders:** Outdoor guides requiring fast, structured safety overviews and permit compliance checks for client groups.
* **Regional Tourism & Rescue Coordinators:** Organizations looking to promote standardized, tech-enabled safety awareness across remote mountain routes.

---

## Live Demo

* **LIVE Deployed URL:** [https://treksafe-gb.vercel.app](https://treksafe-gb.vercel.app)
* **Status:** Live & Accessible. Users can test expedition risk generation instantly without requiring initial registration.

---

## Features

### 1. Trip & Trekker Intake Portal
* **Interactive Route Selector:** Select from a database of Gilgit-Baltistan routes with real-time key metric previews (Max Altitude, Distance, Duration).
* **Comprehensive Trekker Profiling:** Collects planned travel season, group size, experience tier (*Beginner*, *Intermediate*, *Advanced*), and optional health notes (e.g., mild asthma, knee issues, previous AMS).

### 2. AI Risk Evaluation Engine
* **Multivariate Hazard Modeling:** Evaluates trekker parameters against route elevation profiles and seasonal hazard factors.
* **Structured Hazard Metrics:** Generates explicit hazard levels (*Low*, *Moderate*, *High*, *Critical*) across four distinct categories:
  * **Altitude Risk:** AMS / hypoxia guidance and acclimatization steps.
  * **Weather Risk:** Thermal hazards and seasonal weather patterns.
  * **Terrain Risk:** Physical trail conditions, steepness, and exposure.
  * **Permit Risk:** Local and foreign permit/NOC requirements and police checkposts.
* **Key Red Flags & Critical Warnings:** Explicitly highlights non-negotiable safety rules and high-danger scenarios.
* **Tailored Checklists:** Generates customized gear packing lists and actionable prep steps based on individual health notes and season.

### 3. Backend Resiliency & Reliability
* **Multi-Model Fallback Chain:** Automatically falls back from `gemini-3.5-flash` to `gemini-3.1-flash-lite` if an endpoint is unavailable.
* **Exponential Backoff:** Gracefully handles rate limits (`429`) and server overloads (`503`).
* **Strict JSON Sanitization:** Strips markdown backticks and ensures valid structural JSON parsing.

---

## The AI Feature

### What It Does
The AI feature takes the user's route choice, physical profile, travel timing, and health conditions, cross-references them with structural route metadata, and generates a structured, non-hallucinated JSON evaluation report.

### Input and Output Specifications

* **Input Payload:**
  * Selected route object ID
  * Planned travel season / month
  * Group size
  * Self-reported experience level (`Beginner`, `Intermediate`, `Advanced`)
  * Optional health considerations (e.g., past asthma, joint issues, history of altitude sickness)

* **Output Schema:**
  * `overallRiskLevel`: Single rating (`Low`, `Moderate`, `High`, `Critical`)
  * `summary`: Two-sentence safety outlook summary
  * `hazards`: Detailed breakdown for `altitude`, `weather`, `terrain`, and `permits` (each with `level` and `details`)
  * `redFlags`: Array of critical warning strings
  * `packingChecklist`: Array of required equipment items
  * `prepChecklist`: Array of actionable pre-departure steps

### Model Parameters & Prompt Strategy
* **Primary Model:** `gemini-3.5-flash`
* **Fallback Model:** `gemini-3.1-flash-lite`
* **Temperature:** `0.2` (Low temperature configured to enforce factual safety guidance and eliminate creative hallucination)
* **Prompt Engineering Strategy:** Few-shot structural framing, zero-trust input validation, and schema-constrained response generation.

### Complete AI System Prompt / Instructions

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
Tools, Services, and AI Models UsedCategoryTool / Service / ModelUsage in ProjectFrontend FrameworkNext.js 14 (App Router)React server/client components and page layoutsStylingTailwind CSS / Lucide ReactModern dark-mode UI layout and dynamic iconsProgramming LanguageTypeScriptType safety for API payloads, routes, and JSON parsingAI API & ModelsGoogle Gemini REST API (gemini-3.5-flash, gemini-3.1-flash-lite)Generative risk analysis and structured output generationHosting & DeploymentVercelProduction hosting, automatic CI/CD builds, and serverless API executionVersion ControlGit & GitHubSource code management and repository trackingScreenshots1. Trip & Trekker Profile Input FormThe main intake portal where trekkers select their high-altitude route, travel dates, group size, experience tier, and health considerations.2. AI Risk Pipeline ProcessingReal-time AI loading state evaluating weather vectors, elevation gradients, and permit protocols via Next.js serverless API.3. Generated AI Risk Evaluation ReportThe structured evaluation dashboard featuring overall risk metrics, specific hazard badges (Altitude, Weather, Terrain, Permits), key red flags, tailored packing checklists, and actionable prep steps.How to Run the ProjectPrerequisitesNode.js: v18.x or higher installed.npm: v9.x or higher installed.Google Gemini API Key: Obtainable from Google AI Studio.Installation & SetupClone the repository:Bashgit clone [https://github.com/sayyamullahbaig8-blip/treksafe-gb.git](https://github.com/sayyamullahbaig8-blip/treksafe-gb.git)
cd treksafe-gb
Install dependencies:Bashnpm install
Configure Environment Variables:Create a .env.local file in the root directory:Bashcp .env.example .env.local
Add your Gemini API Key:Code snippetGEMINI_API_KEY=your_actual_gemini_api_key_here
Verify Screenshot Image Paths:Ensure your screenshot files exist in your project structure:public/images/Empty Form.pngpublic/images/In Action.pngpublic/images/Good Response.pngStart the local development server:Bashnpm run dev
View in browser:Open http://localhost:3000 to interact with TrekSafe GB.Folder StructurePlaintexttreksafe-gb/
├── app/
│   ├── api/
│   │   └── assess-risk/
│   │       └── route.ts         # Serverless route with Gemini integration & fallback logic
│   ├── favicon.ico
│   ├── globals.css              # Global styling & Tailwind directives
│   ├── layout.tsx               # Root application layout
│   └── page.tsx                 # Main application dashboard
├── components/
│   ├── HazardCard.tsx           # Individual risk pillar card
│   ├── Navbar.tsx               # Top header branding
│   └── RiskReport.tsx           # Rendered evaluation report dashboard
├── lib/
│   └── routesData.ts            # Localized Gilgit-Baltistan routes database
├── public/
│   └── images/                  # Application screenshots
│       ├── Empty Form.png
│       ├── Good Response.png
│       └── In Action.png
├── .env.local                   # API keys configuration (ignored by git)
├── next.config.mjs              # Next.js settings
├── package.json                 # Project dependencies
├── tailwind.config.ts           # Tailwind theme configuration
└── tsconfig.json                # TypeScript settings
