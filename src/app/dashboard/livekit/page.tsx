"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";

import {
  generateLivekitToken,
  generatePublisherToken,
  fetchRooms,
} from "@/services/live/generate_token";
import {
  LiveKitRoom,
  ParticipantTile,
  GridLayout,
  useTracks,
  VideoConference,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";

const LIVEKIT_URL = "wss://royaksa-virngt4o.livekit.cloud";

export default function LivekitPage() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugLoading, setDebugLoading] = useState(false);
  const [rooms, setRooms] = useState<
    { id: string; name: string; livekitRoomId: string }[]
  >([]);

  useEffect(() => {
    fetchRooms()
      .then((apiRooms) => {
        if (Array.isArray(apiRooms) && apiRooms.length > 0) {
          setRooms(apiRooms);
        } else {
          setRooms([]);
        }
      })
      .catch(() => {
        setRooms([]);
      });
  }, []);

  const handleGenerateToken = async (livekitRoomId: string) => {
    setSelectedRoom(livekitRoomId);
    setTokenData(null);
    setError(null);
    setLoading(true);
    try {
      const data = await generateLivekitToken(livekitRoomId); // ✅ FIXED: use livekitRoomId
      setTokenData(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleDebugPublisherToken = async () => {
    setError(null);
    setTokenData(null);
    setDebugLoading(true);
    try {
      const data = await generatePublisherToken("alhussein"); // just for debug/testing
      setTokenData(data);
      // Navigate to the debug room in full screen
      router.push(`/room/alhussein`);
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setDebugLoading(false);
    }
  };

  const handleGoToPublisherRoom = (livekitRoomId: string) => {
    router.push(`/room/${livekitRoomId}`);
  };

  const handleGoToSubscriberRoom = (livekitRoomId: string) => {
    router.push(`/watch/${livekitRoomId}`);
  };

  return (
    <main className="bg-gradient-to-b from-[#0F1118] to-[#1A1D2B] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#1E2235] rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-4">LiveKit Token</h1>
          <p className="text-gray-300 mb-6">
            اختر غرفة للانضمام إليها أو لتوليد التوكن الخاص بها.
          </p>

          <div className="flex justify-end mb-6">
            <button
              onClick={handleDebugPublisherToken}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-all"
              disabled={debugLoading}
            >
              {debugLoading ? "جاري التوليد..." : "Debug: توليد توكن Publisher"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                الغرف
              </h2>
              <div className="grid gap-3">
                {rooms.length === 0 && (
                  <div className="text-gray-400">لا توجد غرف متاحة</div>
                )}
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-[#23263a] rounded-lg p-4 text-white"
                  >
                    <div className="font-bold mb-2">{room.name}</div>
                    <div className="flex gap-2 mb-2">
                      <button
                        className="px-4 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded transition-all flex-1"
                        onClick={() =>
                          handleGoToPublisherRoom(room.livekitRoomId)
                        }
                      >
                        <span className="flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          بث غرفة
                        </span>
                      </button>
                      <button
                        className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded transition-all flex-1"
                        onClick={() =>
                          handleGoToSubscriberRoom(room.livekitRoomId)
                        }
                      >
                        <span className="flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          مشاهدة غرفة
                        </span>
                      </button>
                    </div>
                    <button
                      className={`w-full px-3 py-1.5 bg-[#2d3045] hover:bg-[#383d5a] text-cyan-300 rounded transition-all text-sm ${
                        selectedRoom === room.livekitRoomId
                          ? "ring-1 ring-cyan-400"
                          : ""
                      }`}
                      onClick={() => handleGenerateToken(room.livekitRoomId)}
                      disabled={loading && selectedRoom === room.livekitRoomId}
                    >
                      {loading && selectedRoom === room.livekitRoomId
                        ? "جاري التوليد..."
                        : "توليد التوكن"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Publisher Video Screen */}
          {tokenData && (
            <div className="mb-4">
              <div className="bg-[#23263a] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-cyan-400 font-semibold">
                    معاينة البث المباشر
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleGoToPublisherRoom(tokenData.room?.livekitRoomId)
                      }
                      className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-1 rounded-lg text-sm transition-all"
                    >
                      بث غرفة
                    </button>
                    <button
                      onClick={() =>
                        handleGoToSubscriberRoom(tokenData.room?.livekitRoomId)
                      }
                      className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm transition-all"
                    >
                      مشاهدة غرفة
                    </button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-cyan-900">
                  <LiveKitRoom
                    token={tokenData.token}
                    serverUrl={LIVEKIT_URL}
                    connect={true}
                    data-lk-theme="default"
                    style={{ height: 400 }}
                  >
                    <VideoConference />
                  </LiveKitRoom>
                </div>
              </div>
            </div>
          )}

          {error && <div className="text-red-400 mb-4">{error}</div>}

          <Link href="/dashboard">
            <span className="text-cyan-400 hover:underline cursor-pointer">
              العودة إلى لوحة التحكم
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
