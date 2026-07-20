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

```text
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
