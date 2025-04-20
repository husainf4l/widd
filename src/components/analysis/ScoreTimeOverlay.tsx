import React from "react";
import { MatchDetails, demoMatchDetails } from "@/services/analysis/demoData";

interface ScoreTimeOverlayProps {
  matchDetails?: MatchDetails;
}

const ScoreTimeOverlay: React.FC<ScoreTimeOverlayProps> = ({
  matchDetails = demoMatchDetails,
}) => {
  if (!matchDetails) return null;
  const { teams, score, time } = matchDetails;
  return (
    <div className="absolute top-4 right-4 z-40 w-fit flex items-center gap-4 bg-black/50 text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-gray-300">{teams[0]}</span>
        <span className="text-lg font-bold leading-none">{score.home}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-base font-semibold tracking-widest">{time}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-gray-300">{teams[1]}</span>
        <span className="text-lg font-bold leading-none">{score.away}</span>
      </div>
    </div>
  );
};

export default ScoreTimeOverlay;
