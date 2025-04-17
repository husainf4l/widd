"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  MediaDeviceMenu,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";
import {
  generateLivekitToken,
  generatePublisherToken,
} from "@/services/live/generate_token";

const LIVEKIT_URL = "wss://royaksa-virngt4o.livekit.cloud";

export default function RoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;

  const [tokenData, setTokenData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPublisher, setIsPublisher] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      if (!roomId) return;

      try {
        setLoading(true);
        // Use the same token generation function as on the original page
        const data =
          roomId === "alhussein"
            ? await generatePublisherToken("alhussein")
            : await generateLivekitToken(roomId);

        setTokenData(data);

        // Check if user is a publisher based on the role in tokenData
        setIsPublisher(data.role === "publisher");
      } catch (err: any) {
        setError(err.message || "حدث خطأ في تحميل الغرفة");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [roomId]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="bg-[#0F1118] h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">جاري تحميل الغرفة...</div>
          <div className="animate-spin h-12 w-12 border-t-2 border-cyan-400 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0F1118] h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-4">{error}</div>
          <button
            onClick={handleGoBack}
            className="bg-cyan-800 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  if (!tokenData?.token) {
    return (
      <div className="bg-[#0F1118] h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">لم يتم العثور على التوكن للغرفة</div>
          <button
            onClick={handleGoBack}
            className="bg-cyan-800 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 z-50 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-all"
      >
        العودة
      </button>

      {/* Camera options menu - only shown for publishers */}
      {isPublisher && (
        <div className="absolute top-4 right-4 z-50">
          <MediaDeviceMenu />
        </div>
      )}

      {/* Full-screen LiveKit video */}
      <LiveKitRoom
        token={tokenData.token}
        serverUrl={LIVEKIT_URL}
        connect={true}
        data-lk-theme="default"
        style={{ height: "100vh", width: "100vw" }}
        video={true}
        audio={true}
      >
        <RoomAudioRenderer />
        {/* Use the VideoConference component directly with its default controls */}
        <VideoConference style={{ height: "100%" }} />
      </LiveKitRoom>
    </div>
  );
}
