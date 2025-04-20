import React from "react";
import { MatchStatistics, MatchEvent } from "@/services/analysis/demoData";

interface StatsTabProps {
  matchStatistics: MatchStatistics;
  recentEvents: MatchEvent[];
}

const StatsTab: React.FC<StatsTabProps> = ({
  matchStatistics,
  recentEvents,
}) => {
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        إحصائيات المباراة
      </h3>

      <div className="space-y-3 mb-4">
        {/* Shots comparison */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white mb-1 text-sm">التسديدات</p>
          <div className="flex items-center">
            <span className="text-white font-bold w-8">
              {matchStatistics.shots.home}
            </span>
            <div className="flex-1 mx-2">
              <div className="flex h-2 overflow-hidden">
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${
                      (matchStatistics.shots.home /
                        (matchStatistics.shots.home +
                          matchStatistics.shots.away)) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="bg-red-500"
                  style={{
                    width: `${
                      (matchStatistics.shots.away /
                        (matchStatistics.shots.home +
                          matchStatistics.shots.away)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <span className="text-white font-bold w-8 text-right">
              {matchStatistics.shots.away}
            </span>
          </div>
        </div>

        {/* Shots on target comparison */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white mb-1 text-sm">التسديدات على المرمى</p>
          <div className="flex items-center">
            <span className="text-white font-bold w-8">
              {matchStatistics.shotsOnTarget.home}
            </span>
            <div className="flex-1 mx-2">
              <div className="flex h-2 overflow-hidden">
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${
                      (matchStatistics.shotsOnTarget.home /
                        (matchStatistics.shotsOnTarget.home +
                          matchStatistics.shotsOnTarget.away)) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="bg-red-500"
                  style={{
                    width: `${
                      (matchStatistics.shotsOnTarget.away /
                        (matchStatistics.shotsOnTarget.home +
                          matchStatistics.shotsOnTarget.away)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <span className="text-white font-bold w-8 text-right">
              {matchStatistics.shotsOnTarget.away}
            </span>
          </div>
        </div>

        {/* Corners comparison */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white mb-1 text-sm">الركنيات</p>
          <div className="flex items-center">
            <span className="text-white font-bold w-8">
              {matchStatistics.corners.home}
            </span>
            <div className="flex-1 mx-2">
              <div className="flex h-2 overflow-hidden">
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${
                      (matchStatistics.corners.home /
                        (matchStatistics.corners.home +
                          matchStatistics.corners.away)) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="bg-red-500"
                  style={{
                    width: `${
                      (matchStatistics.corners.away /
                        (matchStatistics.corners.home +
                          matchStatistics.corners.away)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <span className="text-white font-bold w-8 text-right">
              {matchStatistics.corners.away}
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        أحداث المباراة الأخيرة
      </h3>

      <div className="space-y-2 mb-4">
        {recentEvents.map((event, index) => (
          <div
            key={index}
            className="flex gap-3 bg-gray-900/60 backdrop-blur-sm rounded-lg p-3"
          >
            <div className="min-w-[60px] text-center">
              <span className="text-amber-400 font-bold">{event.time}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    event.type === "goal"
                      ? "bg-green-500/20 text-green-400"
                      : event.type === "yellowCard"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : event.type === "redCard"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {event.type === "goal"
                    ? "هدف"
                    : event.type === "yellowCard"
                    ? "بطاقة صفراء"
                    : event.type === "redCard"
                    ? "بطاقة حمراء"
                    : "تبديل"}
                </span>
                <span className="text-white font-bold">
                  {event.player ||
                    (event.playersInvolved &&
                      `${event.playersInvolved.in} ⟷ ${event.playersInvolved.out}`)}
                </span>
                <span className="text-gray-400 text-sm">{event.team}</span>
              </div>
              <p className="text-gray-300 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsTab;
