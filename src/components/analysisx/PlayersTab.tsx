import React from "react";
import { Player } from "@/services/analysis/demoData";

interface PlayersTabProps {
  players: Player[];
}

const PlayersTab: React.FC<PlayersTabProps> = ({ players }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        تحليل اللاعبين المكتشفين
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-blue-500">
                  {player.stats.jerseyNumber}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold flex items-center gap-2">
                  {player.name}
                  <span className="text-xs text-blue-400 font-normal">
                    {player.stats.team}
                  </span>
                </h4>
                <p className="text-gray-400 text-sm">
                  {player.stats.heatPosition}
                </p>
              </div>
              <div className="ml-auto">
                <div className="bg-blue-500/20 text-blue-400 text-xs py-1 px-2 rounded">
                  ثقة: {Math.round(player.confidence * 100)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-gray-400 text-xs">السرعة الحالية</p>
                <p className="text-white font-bold">
                  {player.stats.currentSpeed}
                </p>
              </div>
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-gray-400 text-xs">المسافة من الكرة</p>
                <p className="text-white font-bold">
                  {player.stats.distanceFromBall}
                </p>
              </div>
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-gray-400 text-xs">النبض</p>
                <p className="text-white font-bold">
                  {player.stats.realTimeMetrics?.heartRate}
                </p>
              </div>
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-gray-400 text-xs">عدد السبرنتات</p>
                <p className="text-white font-bold">
                  {player.stats.realTimeMetrics?.sprintCount}
                </p>
              </div>
            </div>

            <h5 className="text-gray-300 text-sm mb-2">أداء اللاعب</h5>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-gray-800/40 rounded p-2 text-center">
                <p className="text-white font-bold">
                  {player.stats.performance?.goalsScored}
                </p>
                <p className="text-gray-400 text-xs">أهداف</p>
              </div>
              <div className="bg-gray-800/40 rounded p-2 text-center">
                <p className="text-white font-bold">
                  {player.stats.performance?.passAccuracy}
                </p>
                <p className="text-gray-400 text-xs">دقة التمرير</p>
              </div>
              <div className="bg-gray-800/40 rounded p-2 text-center">
                <p className="text-white font-bold">
                  {player.stats.performance?.distanceCovered}
                </p>
                <p className="text-gray-400 text-xs">المسافة</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersTab;
