"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LivePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [permissionState, setPermissionState] = useState<
    | "not-requested"
    | "granted"
    | "denied"
    | "loading"
    | "unavailable"
    | "timeout"
  >("not-requested");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is fully mounted before proceeding
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Check if device has any cameras available
  const checkCameraAvailability = async () => {
    try {
      // First check if the mediaDevices API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setHasCamera(false);
        setPermissionState("unavailable");
        setErrorMessage("Your browser doesn't support camera access.");
        return;
      }

      // We need to request permission first to get labeled devices in some browsers
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        // Stop the stream immediately after getting permissions
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        // Ignore errors here, we'll handle them later
        console.warn("Permission check failed:", err);
      }

      // Now enumerate devices after permission request
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");

      console.log("Available cameras:", cameras.length);
      cameras.forEach((camera, index) => {
        console.log(`Camera ${index}: ${camera.label || "unlabeled camera"}`);
      });

      setCameraDevices(cameras);
      setHasCamera(cameras.length > 0);

      // If cameras are found, select the first one by default
      if (cameras.length > 0) {
        setSelectedCamera(cameras[0].deviceId);
      } else {
        setPermissionState("unavailable");
        setErrorMessage("No camera found on this device.");
      }
    } catch (err) {
      console.error("Error checking camera availability:", err);
      setHasCamera(false);
      setPermissionState("unavailable");
      setErrorMessage("Failed to detect cameras.");
    }
  };

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
        setIsVideoPlaying(true);

        // Clear any timeout we might have set
        if (streamTimeoutRef.current) {
          clearTimeout(streamTimeoutRef.current);
          streamTimeoutRef.current = null;
        }
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
      // Clean up timeout if component unmounts
      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current);
        streamTimeoutRef.current = null;
      }

      // Remove event listeners
      if (videoElement) {
        videoElement.onplaying = null;
        videoElement.onloadedmetadata = null;
        videoElement.onerror = null;
      }
    };
  }, [isMounted]);

  // Manual refresh to detect new cameras (like iPhone connected later)
  const refreshCameras = async () => {
    setPermissionState("loading");
    setErrorMessage(null);
    setIsVideoPlaying(false);
    await checkCameraAvailability();
  };

  const requestCameraPermission = async () => {
    // First check if the video element exists
    if (!videoRef.current) {
      console.error("Video element not found when requesting permission");
      setPermissionState("denied");
      setErrorMessage(
        "Video element not found. Please try refreshing the page."
      );
      return;
    }

    setPermissionState("loading");
    setErrorMessage(null);
    setIsVideoPlaying(false);

    // Set a timeout to detect if camera stream initialization hangs
    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current);
    }

    streamTimeoutRef.current = setTimeout(() => {
      // If we get here, camera initialization took too long
      console.log("Camera stream initialization timed out");
      setPermissionState("timeout");
      setErrorMessage(
        "Camera access timed out. The camera may be in use by another application or not responding."
      );

      // Try to stop any pending tracks that might be hanging
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }, 10000); // 10 second timeout

    try {
      // First check if the device has any cameras
      if (hasCamera === false) {
        setPermissionState("unavailable");
        setErrorMessage("No camera found on this device.");
        if (streamTimeoutRef.current) {
          clearTimeout(streamTimeoutRef.current);
          streamTimeoutRef.current = null;
        }
        return;
      }

      await setupCamera();
    } catch (err) {
      console.error("Error in permission flow:", err);
      setPermissionState("denied");
      setErrorMessage("Failed to access camera.");

      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current);
        streamTimeoutRef.current = null;
      }
    }
  };

  const setupCamera = async () => {
    try {
      // Check if the video element exists before proceeding
      if (!videoRef.current) {
        console.error("Video element not found when setting up camera");
        setPermissionState("denied");
        setErrorMessage(
          "Video element not found. Please try refreshing the page."
        );

        if (streamTimeoutRef.current) {
          clearTimeout(streamTimeoutRef.current);
          streamTimeoutRef.current = null;
        }
        return;
      }

      console.log(
        "Setting up camera with device ID:",
        selectedCamera || "default"
      );

      // First clear any existing stream
      if (videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => {
          console.log(
            `Stopping existing track: ${track.kind} - ${track.label}`
          );
          track.stop();
        });
        videoRef.current.srcObject = null;
      }

      // Build high-quality video constraints
      const videoConstraints: MediaTrackConstraints = {
        // Set specific device if selected
        ...(selectedCamera ? { deviceId: { exact: selectedCamera } } : {}),
        // High quality settings
        width: { ideal: 1920, min: 1280 },
        height: { ideal: 1080, min: 720 },
        aspectRatio: 16 / 9,
        frameRate: { ideal: 30, min: 24 },
        // Request highest quality available
        advanced: [
          { width: { min: 1920 }, height: { min: 1080 } },
          { width: { min: 1280 }, height: { min: 720 } },
          { frameRate: 30 },
        ],
      };

      const constraints = {
        video: videoConstraints,
        audio: false,
      };

      console.log(
        "Requesting camera with high-quality constraints:",
        JSON.stringify(constraints)
      );
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Log the actual track settings we received
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const settings = videoTrack.getSettings();
        console.log("Actual camera settings:", settings);
        console.log(
          `Resolution: ${settings.width}x${settings.height}, Frame rate: ${settings.frameRate}`
        );
      }

      console.log("Camera stream obtained successfully");

      // Check again if the video element exists, it might have been unmounted
      if (!videoRef.current) {
        console.error("Video element not found after obtaining stream");
        setPermissionState("denied");
        setErrorMessage(
          "Video element not found. Please try refreshing the page."
        );

        // Clean up the stream since we can't attach it
        stream.getTracks().forEach((track) => track.stop());

        if (streamTimeoutRef.current) {
          clearTimeout(streamTimeoutRef.current);
          streamTimeoutRef.current = null;
        }
        return;
      }

      // Set the stream to the video element
      console.log("Setting srcObject on video element");
      videoRef.current.srcObject = stream;

      // Force playing the video
      try {
        console.log("Attempting to play video");
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video playback started successfully");
              setPermissionState("granted");
              setErrorMessage(null);

              if (streamTimeoutRef.current) {
                clearTimeout(streamTimeoutRef.current);
                streamTimeoutRef.current = null;
              }
            })
            .catch((err) => {
              console.error("Error playing video:", err);
              setPermissionState("denied");
              setErrorMessage(
                "Could not play camera stream. Try clicking on the page."
              );

              if (streamTimeoutRef.current) {
                clearTimeout(streamTimeoutRef.current);
                streamTimeoutRef.current = null;
              }
            });
        }
      } catch (playError) {
        console.error("Error playing video:", playError);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      if (err instanceof DOMException) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setPermissionState("denied");
          setErrorMessage(
            "Camera access was denied. Please allow camera permissions to use this feature."
          );
        } else if (err.name === "NotFoundError") {
          setPermissionState("unavailable");
          setErrorMessage("Selected camera not found or disconnected.");
        } else if (
          err.name === "NotReadableError" ||
          err.name === "AbortError"
        ) {
          setPermissionState("denied");
          setErrorMessage(
            "Could not access your camera. It may be in use by another application."
          );
        } else if (err.name === "OverconstrainedError") {
          // The requested quality is too high for this camera, try again with lower settings
          console.warn(
            "Camera doesn't support requested quality, trying lower quality"
          );

          const fallbackConstraints = {
            video: {
              ...(selectedCamera
                ? { deviceId: { exact: selectedCamera } }
                : {}),
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          };

          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia(
              fallbackConstraints
            );
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream;
              videoRef.current.play().then(() => {
                setPermissionState("granted");
                setErrorMessage(null);
                if (streamTimeoutRef.current) {
                  clearTimeout(streamTimeoutRef.current);
                  streamTimeoutRef.current = null;
                }
              });
            }
            return;
          } catch (fallbackErr) {
            console.error("Fallback camera access also failed:", fallbackErr);
          }

          setPermissionState("denied");
          setErrorMessage(
            "Your camera doesn't support the requested quality settings."
          );
        } else {
          setPermissionState("denied");
          setErrorMessage(`Camera error: ${err.message}`);
        }
      } else {
        setPermissionState("denied");
        setErrorMessage(
          "An unknown error occurred when trying to access the camera."
        );
      }

      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current);
        streamTimeoutRef.current = null;
      }
    }
  };

  // Function to manually force video to play
  const forcePlay = () => {
    if (!videoRef.current) {
      console.error("Video element not found when trying to force play");
      setPermissionState("denied");
      setErrorMessage(
        "Video element not found. Please try refreshing the page."
      );
      return;
    }

    if (videoRef.current.srcObject) {
      console.log("Force play attempt");
      videoRef.current
        .play()
        .then(() => {
          console.log("Force play successful");
          setIsVideoPlaying(true);
          setPermissionState("granted");
        })
        .catch((err) => {
          console.error("Force play failed:", err);
        });
    }
  };

  // Switch camera when selection changes
  useEffect(() => {
    if (!isMounted) return;

    if (permissionState === "granted" && selectedCamera) {
      setIsVideoPlaying(false);

      // Check if the video element exists
      if (!videoRef.current) {
        console.error("Video element not found when switching cameras");
        setPermissionState("denied");
        setErrorMessage(
          "Video element not found. Please try refreshing the page."
        );
        return;
      }

      // Stop current stream before switching
      if (videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      // Set up new camera
      setupCamera();
    }
  }, [selectedCamera, isMounted, permissionState]);

  // Use fallback background if no camera is available
  const useFallbackBackground = () => {
    // Clear any camera streams
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current);
      streamTimeoutRef.current = null;
    }

    setPermissionState("granted");
    setErrorMessage(null);
    setIsVideoPlaying(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Render early if not mounted yet
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Always render the video element but keep it hidden until needed - this ensures the ref is always available */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover z-0 ${
          permissionState !== "granted" || !videoRef.current?.srcObject
            ? "hidden"
            : ""
        }`}
        style={{ objectFit: "cover", imageRendering: "high-quality" }}
        onClick={forcePlay}
      />

      {/* Fallback background when video is not showing */}
      {(permissionState !== "granted" || !videoRef.current?.srcObject) && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900 to-indigo-900 z-0">
          <div className="absolute inset-0 opacity-20 bg-grid-white"></div>
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-semibold text-white bg-black/50 px-6 py-3 rounded-lg shadow-lg mb-6">
          Live Camera Feed
        </h1>

        {/* Status indicator when camera is granted but might not be playing */}
        {permissionState === "granted" &&
          videoRef.current &&
          videoRef.current.srcObject &&
          !isVideoPlaying && (
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
        {permissionState === "granted" && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full">
              {cameraDevices.length > 1 && (
                <select
                  value={selectedCamera || ""}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="bg-transparent border border-white/30 rounded px-2 py-1 mr-2"
                >
                  {cameraDevices.map((device) => (
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
                !isVideoPlaying && (
                  <button
                    onClick={forcePlay}
                    className="text-white ml-2 px-3 py-1 bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Start Stream
                  </button>
                )}
            </div>
          </div>
        )}

        {/* Permission request UI */}
        {permissionState === "not-requested" && hasCamera !== null && (
          <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-medium mb-3">Camera Access Required</h2>
            <p className="mb-4">
              To use the live camera feed, we need permission to access your
              camera.
            </p>
            {hasCamera ? (
              <>
                {cameraDevices.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Camera:
                    </label>
                    <select
                      value={selectedCamera || ""}
                      onChange={(e) => setSelectedCamera(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {cameraDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label ||
                            `Camera ${device.deviceId.slice(0, 5)}...`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={requestCameraPermission}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors mb-3"
                >
                  Allow Camera Access
                </button>
                <div className="text-right mt-1">
                  <button
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {showAdvancedOptions
                      ? "Hide Advanced Options"
                      : "Show Advanced Options"}
                  </button>
                </div>

                {showAdvancedOptions && (
                  <div className="mt-3 text-left">
                    <button
                      onClick={refreshCameras}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Refresh Camera List
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Use this if you've connected a new camera device.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-yellow-600 font-medium">
                  No camera detected on your device.
                </p>
                <button
                  onClick={refreshCameras}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors mb-2"
                >
                  Refresh Camera List
                </button>
                <p className="text-sm">
                  If you just connected a camera or iPhone, click refresh.
                </p>
                <hr className="my-3" />
                <button
                  onClick={useFallbackBackground}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Continue with Fallback Background
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading state */}
        {permissionState === "loading" && (
          <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
            <p className="mb-4">Accessing camera...</p>
            <button
              onClick={() => {
                // Force stop the current attempt
                if (streamTimeoutRef.current) {
                  clearTimeout(streamTimeoutRef.current);
                  streamTimeoutRef.current = null;
                }

                if (videoRef.current && videoRef.current.srcObject) {
                  const tracks = (
                    videoRef.current.srcObject as MediaStream
                  ).getTracks();
                  tracks.forEach((track) => track.stop());
                  videoRef.current.srcObject = null;
                }

                // Go back to camera selection
                setPermissionState("not-requested");
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Cancel and go back
            </button>
          </div>
        )}

        {/* Timeout state */}
        {permissionState === "timeout" && (
          <div className="bg-orange-100 border border-orange-400 text-orange-800 p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-medium mb-2">Camera Access Timeout</h2>
            <p className="mb-4">
              {errorMessage ||
                "Camera access is taking too long. This usually happens when the camera is in use by another application."}
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={requestCameraPermission}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <div className="flex justify-between">
                <button
                  onClick={refreshCameras}
                  className="text-sm text-orange-700 hover:underline"
                >
                  Refresh Camera List
                </button>
                <button
                  onClick={useFallbackBackground}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Use Fallback Background
                </button>
              </div>
              <div className="mt-2 p-3 bg-white rounded-md text-sm">
                <p className="font-medium mb-1">Troubleshooting Tips:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Close other applications that might be using the camera
                  </li>
                  <li>
                    For iPhone cameras: make sure the connection is stable
                  </li>
                  <li>Try restarting your browser</li>
                  <li>Some antivirus software might block camera access</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Permission denied message */}
        {permissionState === "denied" && errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-medium mb-2">Camera Access Denied</h2>
            <p className="mb-4">{errorMessage}</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={requestCameraPermission}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <div className="flex justify-between">
                <button
                  onClick={refreshCameras}
                  className="text-sm text-red-700 hover:underline"
                >
                  Refresh Camera List
                </button>
                <button
                  onClick={useFallbackBackground}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Use Fallback Background
                </button>
              </div>
              <p className="text-sm mt-2">
                If you previously denied permission, you may need to reset
                permissions in your browser settings.
              </p>
            </div>
          </div>
        )}

        {/* No camera available message */}
        {permissionState === "unavailable" && (
          <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-medium mb-2">Camera Not Available</h2>
            <p className="mb-4">
              {errorMessage || "No camera was detected on your device."}
            </p>

            <div className="mb-4 bg-white p-4 rounded-lg border border-amber-200 text-sm">
              <h3 className="font-medium mb-2">Troubleshooting:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Make sure your camera is connected and not physically covered.
                </li>
                <li>
                  Close other applications that might be using the camera (Zoom,
                  FaceTime, Photo Booth, etc.).
                </li>
                <li>
                  Check browser camera permissions:
                  <ul className="list-disc pl-5 my-1">
                    <li>
                      Open System Settings &gt; Privacy & Security &gt; Camera
                    </li>
                    <li>
                      Ensure your browser (Safari, Chrome, etc.) is allowed to
                      access the camera
                    </li>
                  </ul>
                </li>
                <li>
                  Try refreshing the camera list after connecting devices.
                </li>
              </ol>

              <div className="mt-4 pt-3 border-t border-amber-200">
                <h3 className="font-medium mb-2">Using iPhone as Camera:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>For EpocCam, Camo, or similar apps:</strong>
                    <ul className="list-disc pl-5 my-1">
                      <li>
                        Ensure both your iPhone and computer are on the same
                        WiFi network
                      </li>
                      <li>
                        Make sure you've installed the companion app on your Mac
                      </li>
                      <li>
                        Check if the virtual camera appears in the camera list
                      </li>
                      <li>
                        Try clicking the "Refresh Camera List" button after
                        connecting
                      </li>
                      <li>
                        Try restarting your browser if the virtual camera isn't
                        detected
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>For Continuity Camera:</strong>
                    <ul className="list-disc pl-5 my-1">
                      <li>Ensure your Mac is running macOS Ventura or later</li>
                      <li>Make sure your iPhone is running iOS 16 or later</li>
                      <li>
                        Both devices must be signed in to the same Apple ID
                      </li>
                      <li>
                        Try clicking the "Refresh Camera List" button after
                        connecting
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex justify-between flex-wrap gap-2">
              <button
                onClick={refreshCameras}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Refresh Camera List
              </button>
              <button
                onClick={useFallbackBackground}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Use Fallback Background
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
