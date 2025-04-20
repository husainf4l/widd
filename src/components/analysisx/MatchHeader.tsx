import React from "react";
import { MatchDetection } from "@/services/analysis/demoData";

interface MatchHeaderProps {
  matchInfo: MatchDetection;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ matchInfo }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-bold text-white">{matchInfo.matchType}</h2>
        <p className="text-gray-300 text-sm">{matchInfo.venue}</p>
      </div>
      <div className="flex items-center gap-3 bg-gray-900/80 rounded-xl p-2 backdrop-blur-sm">
        <div className="text-right">
          <p className="text-white font-bold">{matchInfo.teams[0]}</p>
          <p className="text-2xl font-bold text-white">
            {matchInfo.score.home}
          </p>
        </div>
        <div className="px-3">
          <p className="text-gray-300 text-xs">الدقيقة</p>
          <p className="text-red-500 font-bold">{matchInfo.time}</p>
        </div>
        <div className="text-left">
          <p className="text-white font-bold">{matchInfo.teams[1]}</p>
          <p className="text-2xl font-bold text-white">
            {matchInfo.score.away}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
