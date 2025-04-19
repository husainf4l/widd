"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";

// Demo analysis results for camera feature (same as in dashboard)
const demoAnalysisResults = {
  matchDetection: {
    detected: true,
    confidence: 0.95,
    matchId: "M2025-04-19-001",
    teams: ["الأهلي", "الاتحاد"],
  },
  players: [
    {
      id: "P003",
      name: "عبدالرزاق حمدالله",
      position: { x: 32, y: 64 },
      confidence: 0.89,
      stats: {
        currentSpeed: "24.3 كم/س",
        distanceFromBall: "5.2 م",
        heatPosition: "هجوم أمامي",
      },
    },
    {
      id: "P008",
      name: "سالم الدوسري",
      position: { x: 48, y: 42 },
      confidence: 0.92,
      stats: {
        currentSpeed: "26.7 كم/س",
        distanceFromBall: "2.1 م",
        heatPosition: "وسط مهاجم",
      },
    },
    {
      id: "P012",
      name: "ياسر الشهراني",
      position: { x: 22, y: 35 },
      confidence: 0.87,
      stats: {
        currentSpeed: "21.5 كم/س",
        distanceFromBall: "12.8 م",
        heatPosition: "دفاع جانبي",
      },
    },
  ],
  fieldAnalysis: {
    ballPosition: { x: 45, y: 40 },
    formation: "4-3-3",
    possessionTeam: "الأهلي",
    possessionPercentage: "62%",
  },
};

export default function AnalysisPage() {
  const { user } = useAuth();
  const [isCaptureMode, setIsCaptureMode] = useState(true);
  const [capturedImageForAnalysis, setCapturedImageForAnalysis] = useState<
    string | null
  >(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<
    typeof demoAnalysisResults | null
  >(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraPermissionsGranted, setCameraPermissionsGranted] =
    useState(false);
  const [showControls, setShowControls] = useState(true);

  // Initialize camera on page load
  useEffect(() => {
    initCamera();

    // Clean up camera stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Auto-hide controls after 5 seconds of inactivity
  useEffect(() => {
    if (analysisResults) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [analysisResults, showControls]);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      setCameraPermissionsGranted(true);
      setIsCaptureMode(true);
      setCapturedImageForAnalysis(null);
      setAnalysisResults(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermissionsGranted(false);
    }
  };

  const captureFrameForAnalysis = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw video frame to canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );

        // Convert canvas to image for analysis only (don't change the view)
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImageForAnalysis(imageDataUrl);
        return imageDataUrl;
      }
    }
    return null;
  };

  const analyzeFrame = () => {
    const capturedFrame = captureFrameForAnalysis();
    if (!capturedFrame) return;

    setIsAnalyzing(true);

    // Simulating API call with a timeout
    setTimeout(() => {
      // In a real implementation, here you would send the image to your backend
      // For demo, we're using the mock data
      setAnalysisResults(demoAnalysisResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearAnalysis = () => {
    setAnalysisResults(null);
    setCapturedImageForAnalysis(null);
  };

  const addPlayerMarker = (player, index) => {
    // Position is in percentage (0-100) of the screen
    const style = {
      left: `${player.position.x}%`,
      top: `${player.position.y}%`,
      backgroundColor:
        index === 0 ? "rgba(52, 211, 153, 0.8)" : "rgba(59, 130, 246, 0.8)",
      border: `2px solid ${
        index === 0 ? "rgb(16, 185, 129)" : "rgb(37, 99, 235)"
      }`,
    };

    return (
      <div
        key={player.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold z-20"
        style={style}
      >
        {index + 1}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          {player.name}
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <main
        className="relative h-screen w-screen overflow-hidden bg-black"
        onClick={toggleControls}
      >
        {/* Back button */}
        <div
          className={`absolute top-4 left-4 z-50 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href="/dashboard"
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>

        {/* Full screen camera view */}
        <div className="relative h-full w-full">
          {cameraPermissionsGranted ? (
            <>
              {/* Always display the live video feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />

              {/* Overlay markers for players and ball on live video */}
              {analysisResults && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Player markers on the live video feed */}
                  {analysisResults.players.map((player, index) =>
                    addPlayerMarker(player, index)
                  )}

                  {/* Ball position marker */}
                  <div
                    className="absolute w-6 h-6 rounded-full bg-white border-2 border-red-500 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${analysisResults.fieldAnalysis.ballPosition.x}%`,
                      top: `${analysisResults.fieldAnalysis.ballPosition.y}%`,
                    }}
                  >
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Transparent overlay for analysis results */}
              {analysisResults && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-20 pb-8 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-white">
                        تحليل ذكي للمباراة
                      </h2>
                      <div className="bg-blue-600/80 text-white px-3 py-1 rounded-lg text-sm">
                        ثقة التحليل:{" "}
                        {analysisResults.matchDetection.confidence * 100}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-gray-400 text-sm">الفرق</p>
                        <p className="text-white font-bold">
                          {analysisResults.matchDetection.teams.join(" ضد ")}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-gray-400 text-sm">الاستحواذ</p>
                        <p className="text-white font-bold">
                          {analysisResults.fieldAnalysis.possessionTeam} (
                          {analysisResults.fieldAnalysis.possessionPercentage})
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-gray-400 text-sm">التشكيل</p>
                        <p className="text-white font-bold">
                          {analysisResults.fieldAnalysis.formation}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-gray-400 text-sm">معرف المباراة</p>
                        <p className="text-white font-bold">
                          {analysisResults.matchDetection.matchId}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      تحليل اللاعبين المكتشفين
                    </h3>
                    <div className="overflow-x-auto flex space-x-3 rtl:space-x-reverse pb-2">
                      {analysisResults.players.map((player) => (
                        <div
                          key={player.id}
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[250px]"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-bold">
                              {player.name}
                            </h4>
                            <span className="text-cyan-400 text-xs">
                              ثقة: {player.confidence * 100}%
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <p className="text-gray-400">السرعة الحالية</p>
                              <p className="text-white">
                                {player.stats.currentSpeed}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">المسافة من الكرة</p>
                              <p className="text-white">
                                {player.stats.distanceFromBall}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">الموقع</p>
                              <p className="text-white">
                                {player.stats.heatPosition}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bottom action bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 flex justify-center transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {!isAnalyzing && !analysisResults && (
                  <button
                    onClick={analyzeFrame}
                    className="bg-white hover:bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center transition-all"
                  >
                    <div className="bg-red-600 w-12 h-12 rounded-full"></div>
                  </button>
                )}
                {isAnalyzing && (
                  <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-white">جاري التحليل...</span>
                  </div>
                )}
                {analysisResults && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={clearAnalysis}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      إزالة التحليل
                    </button>
                    <button
                      onClick={analyzeFrame}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      تحديث التحليل
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Camera permissions not granted
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900 p-6">
              <div className="bg-red-600/20 p-4 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                فشل في الوصول إلى الكاميرا
              </h2>
              <p className="text-gray-300 mb-6 text-center max-w-md">
                يرجى السماح بالوصول إلى الكاميرا للاستفادة من ميزة التحليل
                المباشر للمباراة.
              </p>
              <button
                onClick={initCamera}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
              >
                محاولة مرة أخرى
              </button>
            </div>
          )}
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </main>
    </ProtectedRoute>
  );
}
