import React, { useEffect, useRef, useState } from "react";

interface CameraViewProps {
  onCapture: (imageData: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraPermissionsGranted, setCameraPermissionsGranted] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>(
    []
  );
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");

  // Fetch available cameras
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0 && !selectedCameraId) {
        setSelectedCameraId(videoDevices[0].deviceId);
      }
    });
  }, []);

  // Initialize camera
  const initCamera = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedCameraId
          ? { deviceId: { exact: selectedCameraId } }
          : { facingMode: "environment" },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraPermissionsGranted(true);
    } catch (error) {
      setCameraPermissionsGranted(false);
      setErrorMessage(
        "لم نتمكن من الوصول إلى الكاميرا. يرجى السماح بالوصول أو التحقق من اتصال الكاميرا."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCameraId]);

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(e.target.value);
  };

  // Helper to capture image from video
  const captureImage = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    onCapture(imageData);
  };

  // Only show error if camera is not available and not loading
  if (!cameraPermissionsGranted && !isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center max-w-md p-6 bg-gray-800/80 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-red-500"
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
          <h2 className="text-xl font-bold mb-2">لم يتم العثور على الكاميرا</h2>
          <p className="text-gray-300 mb-4">
            {errorMessage ||
              "لم نتمكن من الوصول إلى كاميرا الجهاز. تأكد من توصيل الكاميرا وأنك منحت التطبيق الإذن باستخدامها."}
          </p>
          {availableCameras.length > 0 && (
            <div className="mb-4">
              <label
                htmlFor="camera-select"
                className="block text-gray-300 mb-2 text-right"
              >
                اختر الكاميرا:
              </label>
              <select
                id="camera-select"
                value={selectedCameraId}
                onChange={handleCameraChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg text-right"
                dir="rtl"
              >
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label ||
                      `كاميرا ${camera.deviceId.substring(0, 5)}...`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={initCamera}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            محاولة مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  // Show loading spinner if loading
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-bold mb-2">جاري الاتصال بالكاميرا...</h2>
        </div>
      </div>
    );
  }

  // Show live camera preview (like a camera app)
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover rounded-xl shadow-lg border border-gray-800"
      />
      {/* Apple-style elegant capture button overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          type="button"
          aria-label="التقاط صورة"
          onClick={captureImage}
          className="w-16 h-16 rounded-full  border border-white/30 shadow-md backdrop-blur-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" className="opacity-70" />
            <circle cx="12" cy="12" r="5.5" className="opacity-40" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CameraView;
