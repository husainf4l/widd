import React, { useRef, useState } from "react";
import Image from "next/image";

interface AnalysisResult {
  matchDetection: {
    detected: boolean;
    confidence: number;
    matchId: string;
    teams: string[];
  };
  players: {
    id: string;
    name: string;
    position: { x: number; y: number };
    confidence: number;
    stats: {
      currentSpeed: string;
      distanceFromBall: string;
      heatPosition: string;
    };
  }[];
  fieldAnalysis: {
    ballPosition: { x: number; y: number };
    formation: string;
    possessionTeam: string;
    possessionPercentage: string;
  };
}

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoAnalysisResults: AnalysisResult;
}

const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  demoAnalysisResults,
}) => {
  const [isCaptureMode, setIsCaptureMode] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  if (!isOpen) return null;

  const capturePicture = () => {
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

        // Convert canvas to image
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        setIsCaptureMode(false);
      }
    }
  };

  const analyzeImage = () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);

    // Simulating API call with a timeout
    setTimeout(() => {
      // In a real implementation, here you would send the image to your backend
      setAnalysisResults(demoAnalysisResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setIsCaptureMode(true);
    setAnalysisResults(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isCaptureMode
              ? "التقاط صورة للتحليل"
              : analysisResults
              ? "نتائج التحليل"
              : "مراجعة الصورة"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {isCaptureMode ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 md:h-80 object-cover rounded-lg bg-black"
              />
              <button
                onClick={capturePicture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : capturedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={capturedImage || ""}
                  alt="Captured"
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-80 object-contain rounded-lg"
                />
              </div>

              {analysisResults ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">
                      معلومات المباراة
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400">الفرق</p>
                        <p className="text-white">
                          {analysisResults.matchDetection.teams.join(" ضد ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">معرف المباراة</p>
                        <p className="text-white">
                          {analysisResults.matchDetection.matchId}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">الاستحواذ</p>
                        <p className="text-white">
                          {analysisResults.fieldAnalysis.possessionTeam} (
                          {analysisResults.fieldAnalysis.possessionPercentage})
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">التشكيل</p>
                        <p className="text-white">
                          {analysisResults.fieldAnalysis.formation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">
                      تحليل اللاعبين المكتشفين
                    </h3>
                    <div className="space-y-3">
                      {analysisResults.players.map((player) => (
                        <div
                          key={player.id}
                          className="border-b border-gray-700 pb-2 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-white">{player.name}</h4>
                            <span className="text-cyan-400 text-xs">
                              ثقة: {player.confidence * 100}%
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
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
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={retakePicture}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      التقاط صورة جديدة
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      إغلاق التحليل
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={retakePicture}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    إعادة التقاط
                  </button>
                  {isAnalyzing ? (
                    <button
                      disabled
                      className="bg-blue-600 opacity-70 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
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
                      جاري التحليل...
                    </button>
                  ) : (
                    <button
                      onClick={analyzeImage}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      تحليل بالذكاء الاصطناعي
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Hidden canvas used for capturing frames */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CameraModal;
