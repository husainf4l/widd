import React from "react";
import { MatchDetection, FieldAnalysis } from "@/services/analysis/demoData";

interface KeyStatsProps {
  matchInfo: MatchDetection;
  fieldAnalysis: FieldAnalysis;
  expectedGoals: { home: number; away: number };
}

const KeyStats: React.FC<KeyStatsProps> = ({
  matchInfo,
  fieldAnalysis,
  expectedGoals,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="bg-gradient-to-r from-indigo-900/60 to-blue-900/60 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-300 text-sm">الفرق</p>
        </div>
        <p className="text-white font-bold mt-1">
          {matchInfo.teams.join(" ضد ")}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p className="text-gray-300 text-sm">الاستحواذ</p>
        </div>
        <div className="flex items-center mt-1">
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{
                width: fieldAnalysis.possessionPercentage.home,
              }}
            ></div>
          </div>
          <p className="text-white font-bold ml-2 min-w-[40px] text-right">
            {fieldAnalysis.possessionPercentage.home}
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-emerald-900/60 to-teal-900/60 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-gray-300 text-sm">الفرص المتوقعة</p>
        </div>
        <p className="text-white font-bold mt-1">
          {expectedGoals.home} - {expectedGoals.away}
        </p>
      </div>
      <div className="bg-gradient-to-r from-amber-900/60 to-orange-900/60 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
          <p className="text-gray-300 text-sm">التشكيل</p>
        </div>
        <p className="text-white font-bold mt-1">
          {fieldAnalysis.formation.home} vs {fieldAnalysis.formation.away}
        </p>
      </div>
    </div>
  );
};

export default KeyStats;
