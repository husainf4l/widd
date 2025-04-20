import React from "react";
import { PlayerAnalysis } from "@/services/analysis/demoData";

const PlayerAnalysisDemo = () => {
  return (
    <div className="bg-gray-900/30 rounded-xl shadow-lg p-4 text-white text-sm space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Player Analysis: {PlayerAnalysis.player.name}
      </h2>
      <div className="mb-2">
        <strong>Team:</strong> {PlayerAnalysis.player.team}
      </div>
      <div className="mb-2">
        <strong>Position:</strong> {PlayerAnalysis.player.position}
      </div>
      <div className="mb-2">
        <strong>Match:</strong> {PlayerAnalysis.player.match}
      </div>
      <div className="mb-2">
        <strong>Jersey Number:</strong> {PlayerAnalysis.player.jersey_number}
      </div>
      <div className="mb-4">
        <img
          src={PlayerAnalysis.physical_performance.heat_map}
          alt="Heat Map"
          className="object-contain border rounded"
        />
      </div>
      <div className="mb-2">
        <strong>Distance Covered (km):</strong>{" "}
        {PlayerAnalysis.physical_performance.distance_covered_km}
      </div>
      <div className="mb-2">
        <strong>Top Speed (km/h):</strong>{" "}
        {PlayerAnalysis.physical_performance.top_speed_kmh}
      </div>
      <div className="mb-2">
        <strong>Pass Accuracy (%):</strong>{" "}
        {PlayerAnalysis.technical_skills.pass_accuracy_percent}
      </div>
      <div className="mb-2">
        <strong>Goals:</strong> {PlayerAnalysis.match_events.goals}
      </div>
      <div className="mb-2">
        <strong>Assists:</strong> {PlayerAnalysis.match_events.assists}
      </div>
      {/* Add more fields as needed for your UI */}
    </div>
  );
};

export default PlayerAnalysisDemo;
