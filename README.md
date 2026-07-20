TrekSafe GB: High-Altitude Safety and Expedition Risk EvaluatorTrekSafe GB is an advanced safety evaluation platform designed specifically for high-altitude trekking and mountaineering expeditions in the Gilgit-Baltistan region of Pakistan. Developed to assist both trekkers and tour operators, TrekSafe GB uses structural AI risk modeling to mitigate hazards, ensure permit compliance, and promote responsible mountain tourism.A. App Name, Function, and the Real Problem SolvedTrekSafe GB solves the critical problem of inadequate pre-expedition safety planning in high-altitude environments. For both local and international tourists, trekking in regions like the Karakoram and Himalayan ranges involves extreme physiological hazards, weather risks, and complex logistical requirements (permits, escorts). A lack of unified safety information often leads to Acute Mountain Sickness (AMS), thermal injury, or logistical stalling. TrekSafe GB provides instant, personalized risk diagnostics, allowing explorers to gauge whether their readiness matches the physical requirements of a selected route.B. The LIVE Deployed URLLIVE APPLICATION: https://treksafe-gb.vercel.app(Clickable and fully functional on all modern web browsers.)C. Features List: Everything TrekSafe GB Can DoTrekSafe GB provides a full-stack, data-driven experience. Key features include:1. Trip & Trekker Profile IntakeRoute Knowledgebase (ROUTES_DATA): A centralized TypeScript data repository with precise metric data for 10+ major GB routes, including checkpoints, max elevations, physical distances, and base difficulty levels.Persona Identification: Collects key trekker parameters, including experience level, planned travel season, group size, and specific medical considerations (e.g., past asthma or AMS).Dynamic Route Browsing: Trekkers can explore routes and instantaneously view key route metrics before beginning an assessment.2. AI Risk EvaluatorMultivariate Hazard Modeling: Cross-references the individual trekker’s profile (e.g., beginner + medical history) against strict route parameters (max altitude, winter weather factors) to generate tailored risk tiers.Structured Hazard Assessment: Quantifies and explains four unique risk pillars: Altitude Hazards, Weather Hazards, Terrain Complexity, and Permit Logistics.Automated Backoff & Fallback: Implements intelligent model handling (gemini-3.5-flash primary; gemini-3.1-flash-lite fallback) with exponential backoff on RESOURCE_EXHAUSTED (429) or UNAVAILABLE (503) errors.Factual Enforcement: Uses a low temperature (0.2) configuration combined with strict system instructions to prioritize life-safety data over model creativity, suppressing hallucinations.3. Preparation DashboardsTailored Checklists: Generates route-specific and season-specific preparation steps and equipment packing lists (e.g., cold-weather gear for winter treks vs. hydration focus for summer).Red Flag Warnings: Explicitly highlights highest-risk factors and "critical warning" scenarios.D. The AI Feature: What It Does and the Prompt Behind It1. Functional OverviewThe core AI intelligence of TrekSafe GB is a structured risk pipeline, rather than a conversational chatbot. It uses few-shot structural framing to ensure that Gemini acts as a highly constrained evaluator. The pipeline converts unstructured data (trekkers' profile inputs) and metric data (ROUTES_DATA) into valid, non-hallucinated JSON. This ensures safety information is always parsed correctly and never causes UI crashes.2. AI Model Instructions / System PromptPlaintextYou are an expert high-altitude safety and expedition risk evaluator for Gilgit-Baltistan, Pakistan.

Analyze the trekker's profile against the provided route data and return a JSON evaluation.

ROUTE DETAILS:
- Name: ${selectedRoute.name}
- Region: ${selectedRoute.region}
- Distance: ${selectedRoute.distanceKm} km
- Max Altitude: ${selectedRoute.maxAltitudeMeters} m
- Base Difficulty: ${selectedRoute.difficulty}
- Checkpoints: ${selectedRoute.checkpoints.map((c) => `${c.name} (${c.elevationMeters}m)`).join(', ')}
- Permits Required: Locals: "${selectedRoute.permitsRequired.locals}" | Foreigners: "${selectedRoute.permitsRequired.foreigners}"

TREKKER PROFILE:
- Planned Travel Date/Season: ${season || 'Not specified'}
- Group Size: ${groupSize || 1}
- Self-Reported Experience Level: ${experienceLevel || 'Beginner'}
- Health Considerations: ${healthNotes || 'None'}

INSTRUCTIONS:
Return strictly a valid JSON object matching this structure:
{
  "overallRiskLevel": "Moderate",
  "summary": "Two sentences outlining key physiological and environmental safety risks.",
  "hazards": {
    "altitude": { "level": "Moderate", "details": "Specific AMS/acclimatization guidance" },
    "weather": { "level": "Low", "details": "Seasonal thermal or rainfall risks" },
    "terrain": { "level": "Moderate", "details": "Physical trail hazard factors" },
    "permits": { "level": "High", "details": "Necessary documentation/escorts required" }
  },
  "redFlags": ["Critical safety warning 1", "Critical safety warning 2"],
  "packingChecklist": ["Essential gear item 1", "Essential gear item 2"],
  "prepChecklist": ["Actionable preparation step 1", "Actionable preparation step 2"]
}
E. Tools, Services, and AI Models UsedAI Integration: Google Gemini REST API (incorporating gemini-3.5-flash and gemini-3.1-flash-lite fallbacks).Web Framework: Next.js 14 (App Router).Programming Language: TypeScript (for strict typing across data definitions and API payloads).Styling: Tailwind CSS (utility-first CSS with modern custom coloring).Icons: Lucide React.Version Control: Git and GitHub.Deployment: Vercel (CD pipeline with automated builds).F. Screenshots of the App in ActionTrekSafe GB’s progression from data input to intelligent output:Inset 1: Empty Profile FormInset 2: AI Processing PipelineInset 3: Risk Evaluation Report* Trekkers select a high-altitude route and submit experience and medical data. (Reference: image_10.png)* The real-time loading state evaluating weather vectors, elevation gradients, and permit protocols. (Reference: image_12.png)* The generated assessment featuring specific hazard gauges, critical red flags, and customized checklists. (Reference: image_11.png)G. How to Run the ProjectTo deploy TrekSafe GB locally for development:PrerequisitesNode.js (v18 or higher recommended).npm (v9 or higher).A Google Gemini API Key. (Register at Google AI Studio).Step-by-Step InstallationClone the Repository:Bashgit clone https://github.com/sayyamullahbaig8-blip/treksafe-gb.git
cd treksafe-gb
Install Dependencies:Bashnpm install
Configure Environment Variables:
Create a .env.local file in the root directory:Bashcp .env.example .env.local
Add your API key inside .env.local:Code snippetGEMINI_API_KEY=AIzaYourActualGeminiApiKeyHere
Run the Local Development Server:Bashnpm run dev
Access the Application:
Open http://localhost:3000 in your web browser. The app is now live and communicating with the Gemini API.
