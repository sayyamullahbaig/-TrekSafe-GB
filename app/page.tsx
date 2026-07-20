'use client';

import { useState } from 'react';
import { ROUTES_DATA, Route } from '@/lib/routesData';

interface AssessmentResult {
  overallRiskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
  hazards: {
    altitude: { level: string; details: string };
    weather: { level: string; details: string };
    terrain: { level: string; details: string };
    permits: { level: string; details: string };
  };
  redFlags: string[];
  packingChecklist: string[];
  prepChecklist: string[];
}

export default function Home() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(ROUTES_DATA[0].id);
  const [season, setSeason] = useState('June to August');
  const [groupSize, setGroupSize] = useState<number>(2);
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [healthNotes, setHealthNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedRoute = ROUTES_DATA.find((r) => r.id === selectedRouteId) || ROUTES_DATA[0];

  const handleAssessRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/assess-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: selectedRouteId,
          season,
          groupSize,
          experienceLevel,
          healthNotes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate assessment');
      }

      setAssessment(data.assessment);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2 border-b border-slate-800 pb-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-emerald-400">
            ⛰️ TrekSafe GB
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Gilgit-Baltistan Trekking Safety & AI Risk Evaluator. Analyze altitude, seasonal hazard profiles, terrain risk, and permit prerequisites before hitting the trail.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form & Route Selection */}
          <section className="lg:col-span-5 bg-slate-800/60 p-6 rounded-2xl border border-slate-700 space-y-6">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">
              1. Trip & Trekker Profile
            </h2>

            <form onSubmit={handleAssessRisk} className="space-y-4">
              
              {/* Select Route */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Select Route
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {ROUTES_DATA.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name} ({route.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Route Summary Card */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between font-medium text-slate-300">
                  <span>Max Alt: <strong className="text-emerald-400">{selectedRoute.maxAltitudeMeters}m</strong></span>
                  <span>Dist: <strong>{selectedRoute.distanceKm}km</strong></span>
                  <span>Days: <strong>{selectedRoute.typicalDays}d</strong></span>
                </div>
                <p className="text-slate-400 line-clamp-2">{selectedRoute.summary}</p>
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Planned Travel Time / Season
                </label>
                <input
                  type="text"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  placeholder="e.g. Early July, Mid October"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Group Size & Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Group Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Beginner">Beginner (Day Hikes)</option>
                    <option value="Intermediate">Intermediate (3,000m+)</option>
                    <option value="Experienced">Experienced (4,500m+)</option>
                    <option value="Expert Expeditionist">Expert Expeditionist</option>
                  </select>
                </div>
              </div>

              {/* Health Considerations */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Health Considerations (Optional)
                </label>
                <textarea
                  value={healthNotes}
                  onChange={(e) => setHealthNotes(e.target.value)}
                  placeholder="e.g. Mild asthma, knees issues, previous altitude sickness"
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition duration-200 text-sm shadow-lg shadow-emerald-950/50"
              >
                {loading ? 'Evaluating Risk Pipeline...' : 'Generate Safety & Risk Report 🚀'}
              </button>
            </form>
          </section>

          {/* Assessment Output Dashboard */}
          <section className="lg:col-span-7 bg-slate-800/60 p-6 rounded-2xl border border-slate-700 min-h-[450px]">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">
              2. AI Risk Evaluation Report
            </h2>

            {error && (
              <div className="bg-red-950/80 border border-red-700 text-red-200 p-4 rounded-xl text-sm">
                ⚠️ {error}
              </div>
            )}

            {!assessment && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-80 text-center text-slate-500 space-y-2">
                <span className="text-4xl">🏔️</span>
                <p className="text-sm">
                  Select a route, enter your travel details, and click "Generate Safety & Risk Report".
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-80 space-y-4">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-400 animate-pulse">
                  Analyzing route elevation, weather vectors, & permit protocols...
                </p>
              </div>
            )}

            {assessment && !loading && (
              <div className="space-y-6">
                
                {/* Overall Risk Banner */}
                <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">Overall Risk</span>
                    <p className="text-sm text-slate-300 mt-0.5">{assessment.summary}</p>
                  </div>
                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${getBadgeColor(assessment.overallRiskLevel)}`}>
                    {assessment.overallRiskLevel} Risk
                  </span>
                </div>

                {/* Hazards Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(assessment.hazards).map(([key, val]) => (
                    <div key={key} className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between items-center capitalize font-semibold text-slate-300">
                        <span>{key}</span>
                        <span className={`px-2 py-0.5 text-[10px] rounded border ${getBadgeColor(val.level)}`}>
                          {val.level}
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{val.details}</p>
                    </div>
                  ))}
                </div>

                {/* Red Flags */}
                {assessment.redFlags && assessment.redFlags.length > 0 && (
                  <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl text-xs space-y-2">
                    <h3 className="font-bold text-red-400 flex items-center gap-1.5">
                      <span>🚩</span> Key Red Flags & Critical Warnings
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-red-200/90">
                      {assessment.redFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Checklists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Packing Checklist */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-bold text-emerald-400">🎒 Tailored Packing Checklist</h3>
                    <ul className="space-y-1.5">
                      {assessment.packingChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300">
                          <input type="checkbox" className="mt-0.5 accent-emerald-500 rounded" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prep Checklist */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-bold text-emerald-400">📋 Actionable Prep Steps</h3>
                    <ul className="space-y-1.5">
                      {assessment.prepChecklist.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            )}

          </section>

        </div>

      </div>
 </main>
  );
}