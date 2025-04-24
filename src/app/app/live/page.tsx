"use client";

import React, { useEffect, useRef, useState } from "react";
import { cameraService, type CameraServiceState } from "@/services/camera";
import { CameraPermission } from "@/components/camera/CameraPermission";

export default function LivePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CameraServiceState>({
    permissionState: "not-requested",
    errorMessage: null,
    hasCamera: null,
    cameraDevices: [],
    selectedCamera: null,
    isVideoPlaying: false,
    isFullscreen: false,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Helper function to update state
  const updateState = (update: Partial<CameraServiceState>) => {
    setState((prevState) => ({ ...prevState, ...update }));
  };

  // Ensure the component is fully mounted before proceeding
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Track fullscreen changes
  useEffect(() => {
    if (!isMounted) return;

    const handleFullscreenChange = () => {
      cameraService.handleFullscreenChange(updateState);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isMounted]);

  // Run camera check when component is mounted
  useEffect(() => {
    if (isMounted) {
      checkCameraAvailability();
    }
  }, [isMounted]);

  // Add video playing event listener once component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const videoElement = videoRef.current;
    if (videoElement) {
      console.log("Setting up video event listeners");

      // Add event listeners to detect when video starts playing
      videoElement.onplaying = () => {
        console.log("Video is now playing!");
        updateState({ isVideoPlaying: true });
      };

      // Also listen for loadedmetadata event which fires when video metadata is loaded
      videoElement.onloadedmetadata = () => {
        console.log("Video metadata loaded");
      };

      // Add error event listener
      videoElement.onerror = (e) => {
        console.error("Video element error:", e);
      };
    } else {
      console.warn("Video ref is null during event listener setup");
    }

    return () => {
      // Remove event listeners
      if (videoElement) {
        videoElement.onplaying = null;
        videoElement.onloadedmetadata = null;
        videoElement.onerror = null;
      }
    };
  }, [isMounted]);

  // Switch camera when selection changes
  useEffect(() => {
    if (!isMounted) return;

    if (state.permissionState === "granted" && state.selectedCamera) {
      updateState({ isVideoPlaying: false });

      // Set up new camera
      cameraService.setupCamera(videoRef, state.selectedCamera, updateState);
    }
  }, [state.selectedCamera, isMounted, state.permissionState]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      cameraService.stopCamera(videoRef);
    };
  }, []);

  // Check if device has any cameras available
  const checkCameraAvailability = async () => {
    try {
      const result = await cameraService.checkCameraAvailability();
      setState((prevState) => ({
        ...prevState,
        hasCamera: result.hasCamera,
        cameraDevices: result.cameraDevices,
        selectedCamera: result.selectedCamera,
        permissionState: result.permissionState,
        errorMessage: result.errorMessage,
      }));
    } catch (err) {
      console.error("Error in checkCameraAvailability:", err);
    }
  };

  // Manual refresh to detect new cameras
  const refreshCameras = async () => {
    updateState({
      permissionState: "loading",
      errorMessage: null,
      isVideoPlaying: false,
    });
    await checkCameraAvailability();
  };

  // Function to manually force video to play
  const forcePlay = () => {
    cameraService.forcePlay(videoRef, updateState);
  };

  // Use fallback background if no camera is available
  const useFallbackBackground = () => {
    cameraService.stopCamera(videoRef);
    updateState({
      permissionState: "granted",
      errorMessage: null,
      isVideoPlaying: false,
    });
  };

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    await cameraService.toggleFullscreen(videoContainerRef, updateState);
  };

  // Render early if not mounted yet
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" ref={videoContainerRef}>
      {/* Always render the video element but keep it hidden until needed - this ensures the ref is always available */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover z-0 ${
          state.permissionState !== "granted" || !videoRef.current?.srcObject
            ? "hidden"
            : ""
        }`}
        style={{ objectFit: "cover", imageRendering: "auto" }}
        onClick={forcePlay}
      />

      {/* Fallback background when video is not showing */}
      {(state.permissionState !== "granted" ||
        !videoRef.current?.srcObject) && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900 to-indigo-900 z-0">
          <div className="absolute inset-0 opacity-20 bg-grid-white"></div>
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-semibold text-white bg-black/50 px-6 py-3 rounded-lg shadow-lg mb-6">
          x{" "}
        </h1>

        {/* Status indicator when camera is granted but might not be playing */}
        {state.permissionState === "granted" &&
          videoRef.current &&
          videoRef.current.srcObject &&
          !state.isVideoPlaying && (
            <div className="bg-yellow-400/90 text-yellow-900 p-3 rounded-lg max-w-sm text-center mb-4">
              <p>Camera connected but not streaming yet.</p>
              <button
                onClick={forcePlay}
                className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md text-sm"
              >
                Click to Start Stream
              </button>
            </div>
          )}

        {/* Camera Controls when granted */}
        {state.permissionState === "granted" && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full">
              {state.cameraDevices.length > 1 && (
                <select
                  value={state.selectedCamera || ""}
                  onChange={(e) =>
                    updateState({ selectedCamera: e.target.value })
                  }
                  className="bg-transparent border border-white/30 rounded px-2 py-1 mr-2"
                >
                  {state.cameraDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label ||
                        `Camera ${device.deviceId.slice(0, 5)}...`}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={refreshCameras}
                className="text-white ml-2 px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Refresh Cameras
              </button>
              {videoRef.current &&
                videoRef.current.srcObject &&
                !state.isVideoPlaying && (
                  <button
                    onClick={forcePlay}
                    className="text-white ml-2 px-3 py-1 bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Start Stream
                  </button>
                )}
              <button
                onClick={toggleFullscreen}
                className="text-white ml-2 px-3 py-1 bg-gray-600 rounded-md hover:bg-gray-700"
              >
                {state.isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          </div>
        )}

        {/* Camera Permission UI - Using the extracted component */}
        {state.permissionState !== "granted" && (
          <CameraPermission
            state={state}
            updateState={updateState}
            videoRef={videoRef}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            refreshCameras={refreshCameras}
            useFallbackBackground={useFallbackBackground}
          />
        )}
      </div>
    </div>
  );
}
