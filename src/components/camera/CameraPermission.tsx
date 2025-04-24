import React from "react";
import { cameraService, type CameraServiceState } from "@/services/camera";

interface CameraPermissionProps {
  state: CameraServiceState;
  updateState: (update: Partial<CameraServiceState>) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  refreshCameras: () => Promise<void>;
  useFallbackBackground: () => void;
}

export function CameraPermission({
  state,
  updateState,
  videoRef,
  showAdvancedOptions,
  setShowAdvancedOptions,
  refreshCameras,
  useFallbackBackground,
}: CameraPermissionProps) {
  // Request camera permission
  const requestCameraPermission = async () => {
    // First check if the device has any cameras
    if (state.hasCamera === false) {
      updateState({
        permissionState: "unavailable",
        errorMessage: "No camera found on this device.",
      });
      return;
    }

    await cameraService.requestCameraPermission(
      videoRef,
      state.selectedCamera,
      updateState
    );
  };

  // Render based on permission state
  if (state.permissionState === "loading") {
    return (
      <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <p className="mb-4">Accessing camera...</p>
        <button
          onClick={() => {
            // Stop the current attempt
            cameraService.stopCamera(videoRef);
            // Go back to camera selection
            updateState({ permissionState: "not-requested" });
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Cancel and go back
        </button>
      </div>
    );
  }

  if (state.permissionState === "timeout") {
    return (
      <div className="bg-orange-100 border border-orange-400 text-orange-800 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-2">Camera Access Timeout</h2>
        <p className="mb-4">
          {state.errorMessage ||
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
              <li>Close other applications that might be using the camera</li>
              <li>For iPhone cameras: make sure the connection is stable</li>
              <li>Try restarting your browser</li>
              <li>Some antivirus software might block camera access</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (state.permissionState === "denied" && state.errorMessage) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-2">Camera Access Denied</h2>
        <p className="mb-4">{state.errorMessage}</p>
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
    );
  }

  if (state.permissionState === "unavailable") {
    return (
      <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-2">Camera Not Available</h2>
        <p className="mb-4">
          {state.errorMessage || "No camera was detected on your device."}
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
            <li>Try refreshing the camera list after connecting devices.</li>
          </ol>

          <div className="mt-4 pt-3 border-t border-amber-200">
            <h3 className="font-medium mb-2">Using iPhone as Camera:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>For EpocCam, Camo, or similar apps:</strong>
                <ul className="list-disc pl-5 my-1">
                  <li>
                    Ensure both your iPhone and computer are on the same WiFi
                    network
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
                  <li>Both devices must be signed in to the same Apple ID</li>
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
    );
  }

  // Default case (state.permissionState === "not-requested")
  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
      <h2 className="text-xl font-medium mb-3">Camera Access Required</h2>
      <p className="mb-4">
        To use the live camera feed, we need permission to access your camera.
      </p>
      {state.hasCamera ? (
        <>
          {state.cameraDevices.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Camera:
              </label>
              <select
                value={state.selectedCamera || ""}
                onChange={(e) =>
                  updateState({ selectedCamera: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {state.cameraDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
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
  );
}
