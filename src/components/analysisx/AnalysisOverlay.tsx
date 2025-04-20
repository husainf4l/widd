import React from "react";
import MatchHeader from "./MatchHeader";
import KeyStats from "./KeyStats";
import TabsNavigation from "./TabsNavigation";
import PlayersTab from "./PlayersTab";
import StatsTab from "./StatsTab";
import PredictionsTab from "./PredictionsTab";
import { PlayerAnalysisClass } from "@/services/analysis/demoData";

interface AnalysisOverlayProps {
  analysisResults: PlayerAnalysisClass | null;
  activeTab: "players" | "stats" | "predictions";
  setActiveTab: (tab: "players" | "stats" | "predictions") => void;
}

const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({
  analysisResults,
  activeTab,
  setActiveTab,
}) => {
  if (!analysisResults) return null;

  return (
    <div className="absolute top-0 right-0 h-full max-w-lg w-full bg-gradient-to-l from-black/90 to-black/60 overflow-y-auto p-6 z-20"></div>
  );
};

export default AnalysisOverlay;
