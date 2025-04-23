import React from "react";
import { PlayerAnalysisClass } from "@/services/analysis/demoData";

interface DemoAnalysisDataProps {
  analysis: PlayerAnalysisClass;
}

const DemoAnalysisData: React.FC<DemoAnalysisDataProps> = ({ analysis }) => {
  const {} = analysis;
  return (
    <div className="bg-gray-900/30 rounded-xl shadow-lg p-4 text-white text-sm space-y-4">
      <div></div>
    </div>
  );
};

export default DemoAnalysisData;
