import React from "react";
// Removed unused imports
import { PlayerAnalysisClass } from "@/services/analysis/demoData";

interface AnalysisOverlayProps {
  analysisResults: PlayerAnalysisClass | null;
  // Keeping these in the interface but not using them in the component
  activeTab: "players" | "stats" | "predictions";
  setActiveTab: (tab: "players" | "stats" | "predictions") => void;
}

const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({
  analysisResults,
  // Removed unused props
}) => {
  if (!analysisResults) return null;

  return (
    <div className="absolute top-0 right-0 h-full max-w-lg w-full bg-gradient-to-l from-black/90 to-black/60 overflow-y-auto p-6 z-20"></div>
  );
};

export default AnalysisOverlay;
