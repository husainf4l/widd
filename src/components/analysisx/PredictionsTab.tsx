import React from "react";
import { AIPredictions } from "@/services/analysis/demoData";

interface PredictionsTabProps {
  predictions: AIPredictions;
  teams: string[];
}

const PredictionsTab: React.FC<PredictionsTabProps> = ({
  predictions,
  teams,
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
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
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
        توقعات الذكاء الاصطناعي
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Win probability card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg p-4 border border-purple-800/30">
          <h4 className="text-white font-bold mb-3">احتمالية الفوز</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-300">{teams[0]}</span>
                <span className="text-white font-bold">
                  {predictions.winProbability.home}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width: `${predictions.winProbability.home}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-300">{teams[1]}</span>
                <span className="text-white font-bold">
                  {predictions.winProbability.away}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{
                    width: `${predictions.winProbability.away}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">تعادل</span>
                <span className="text-white font-bold">
                  {predictions.winProbability.draw}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gray-500 h-2.5 rounded-full"
                  style={{
                    width: `${predictions.winProbability.draw}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected goals card */}
        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm rounded-lg p-4 border border-green-800/30">
          <h4 className="text-white font-bold mb-2">الأهداف المتوقعة (xG)</h4>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">
                {predictions.expectedGoals.home}
              </p>
              <p className="text-sm text-gray-300">{teams[0]}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xl font-bold text-gray-400">vs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">
                {predictions.expectedGoals.away}
              </p>
              <p className="text-sm text-gray-300">{teams[1]}</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full"
              style={{
                width: `${
                  (predictions.expectedGoals.home /
                    (predictions.expectedGoals.home +
                      predictions.expectedGoals.away)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            نسبة توزيع الفرص المتوقعة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Next goal scorer prediction */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-lg p-4">
          <h4 className="text-white font-bold mb-3">توقع مسجل الهدف القادم</h4>
          <div className="space-y-2">
            {predictions.nextGoalScorer.map((scorer, index) => (
              <div key={index} className="flex items-center">
                <span className="text-white min-w-[150px]">
                  {scorer.player}
                </span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`${
                        index === 0
                          ? "bg-blue-500"
                          : index === 1
                          ? "bg-purple-500"
                          : "bg-pink-500"
                      } h-2 rounded-full`}
                      style={{
                        width: `${scorer.probability}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-white font-bold min-w-[40px] text-right">
                  {scorer.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Possession change prediction */}
        <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg p-4 border border-blue-800/30">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500/30 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold">توقع تغيير الاستحواذ</h4>
              <p className="text-gray-300 mt-1">
                {predictions.possessionChange.prediction}
              </p>
              <div className="mt-2 bg-blue-500/20 text-blue-400 text-xs py-1 px-2 rounded inline-block">
                ثقة: {Math.round(predictions.possessionChange.confidence * 100)}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsTab;
