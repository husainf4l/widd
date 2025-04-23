"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useTracks,
  VideoTrack,
  useRoomContext,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { generateLivekitToken } from "@/services/live/generate_token";
import { RoomEvent, Track } from "livekit-client";

const LIVEKIT_URL = "wss://widd-virngt4o.livekit.cloud";

function ViewerExperience() {
  const [captionText, setCaptionText] = useState<string | null>(null);
  const room = useRoomContext();

  useEffect(() => {
    if (!room) return;

    const handleData = (data: Uint8Array) => {
      const raw = new TextDecoder().decode(data);

      if (!raw || raw.trim() === "") {
        console.warn("⚠️ Received empty data payload");
        return;
      }

      try {
        const message = JSON.parse(raw);

        if (message.type === "caption" && message.text) {
          setCaptionText(message.text);
          setTimeout(() => setCaptionText(null), message.duration || 8000);
        } else {
          console.warn(" Skipped non-caption message:", message);
        }
      } catch (e) {
        console.error(" JSON parse failed:", e);
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      if (room) {
        room.off(RoomEvent.DataReceived, handleData);
      }
    };
  }, [room]);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    {
      onlySubscribed: true,
    }
  );

  if (tracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-black text-white">
        <p className="text-xl">بانتظار بدء البث...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black">
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center">
        <div className="bg-black/40 px-6 py-3 rounded-md">
          <p
            className="text-white text-2xl font-semibold font-cairo"
            style={{ fontFamily: "var(--font-cairo) !important" }}
          >
            {captionText}
          </p>
        </div>
      </div>

      <div className="h-full w-full grid grid-cols-1">
        {tracks.map((track) => (
          <div
            key={track.publication?.trackSid}
            className="relative w-full h-full overflow-hidden"
          >
            <VideoTrack
              trackRef={track}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WatchRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const [tokenData, setTokenData] = useState<{
    token: string;
    room?: { livekitRoomId: string };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      if (!roomId) return;

      try {
        setLoading(true);
        const data = await generateLivekitToken(roomId);
        setTokenData(data);
        console.log("Token received for room:", roomId);
      } catch (err) {
        const error = err as Error;
        setError(error.message || "حدث خطأ في تحميل البث");
        console.error("Error fetching token:", err);
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
      <div className="bg-black h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-xl mb-4">جاري تحميل البث...</div>
          <div className="animate-spin h-10 w-10 border-t-2 border-cyan-400 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
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
      <div className="bg-black h-screen w-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-xl mb-4">لم يتم العثور على البث</div>
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
    <div className="h-screen w-screen bg-black overflow-hidden">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 z-50 bg-black/30 text-white/80 px-3 py-1 rounded-lg hover:bg-black/50 transition-all text-sm"
      >
        العودة
      </button>

      <LiveKitRoom
        token={tokenData.token}
        serverUrl={LIVEKIT_URL}
        connect={true}
        audio={false}
        video={false}
        data-lk-theme="default"
        style={{ height: "100vh", width: "100vw" }}
        onError={(err) => console.error("LiveKit error:", err)}
      >
        <RoomAudioRenderer />
        <ViewerExperience />
      </LiveKitRoom>
    </div>
  );
}
