"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import {
  PlayerAnalysis,
  MatchDetails,
  demoMatchDetails,
} from "@/services/analysis/demoData";
import ScoreTimeOverlay from "@/components/analysis/ScoreTimeOverlay";
import CameraView from "@/components/analysisx/CameraView";
import BackButton from "@/components/icons/BackButton";
import DemoAnalysisData from "@/components/analysis/DemoAnalysisData";
import CloseIcon from "@/components/icons/CloseIcon";
import PlayerAnalysisDemo from "@/components/analysis/PlayerAnalysisDemo";

export default function AnalysisPage() {
  const { user } = useAuth();
  // Only one player analysis, so no need for state or fetching
  const analysis = PlayerAnalysis;
  const matchInfo: MatchDetails = demoMatchDetails;

  const handleCloseAnalysis = () => {
    // No-op since analysis is static
  };

  return (
    <ProtectedRoute>
      <main className="relative h-screen w-screen overflow-hidden bg-black">
        {matchInfo && <ScoreTimeOverlay matchDetails={matchInfo} />}

        <div className="absolute top-24 right-4 z-40 w-[420px] max-w-full">
          <PlayerAnalysisDemo />
        </div>

        {analysis && (
          <div className="absolute top-24 right-4 z-40 w-[420px] max-w-full">
            <button
              className="absolute top-3 left-3 p-1 rounded-full hover:bg-gray-200 transition"
              onClick={handleCloseAnalysis}
              aria-label="Close analysis"
              style={{ background: "rgba(255,255,255,0.7)" }}
            >
              <CloseIcon size={20} className="text-gray-700" />
            </button>
          </div>
        )}
        <div className="absolute top-4 left-4 z-50">
          <BackButton />
        </div>
        <CameraView onCapture={() => {}} />
      </main>
    </ProtectedRoute>
  );
}
