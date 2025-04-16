"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  generateLivekitToken,
  generatePublisherToken,
  fetchRooms,
} from "@/services/live/generate_token";

export default function LivekitPage() {
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
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setDebugLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-[#0F1118] to-[#1A1D2B] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#1E2235] rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-4">LiveKit Token</h1>
          <p className="text-gray-300 mb-6">
            اختر غرفة لتوليد التوكن الخاص بها.
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
                  <button
                    key={room.id}
                    className={`w-full text-left bg-[#23263a] rounded-lg p-4 text-white hover:bg-cyan-900 transition-all ${
                      selectedRoom === room.livekitRoomId
                        ? "ring-2 ring-cyan-400"
                        : ""
                    }`}
                    onClick={() => handleGenerateToken(room.livekitRoomId)} // ✅ FIXED
                    disabled={loading && selectedRoom === room.livekitRoomId}
                  >
                    <span className="font-bold">{room.name}</span>
                    <span className="ml-2 text-cyan-400 text-xs">
                      {loading && selectedRoom === room.livekitRoomId
                        ? "جاري التوليد..."
                        : "توليد التوكن"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Token Result */}
          {tokenData && (
            <div className="mb-4 bg-[#23263a] rounded-lg p-4">
              <div className="text-green-400 break-all mb-2">
                <span className="font-bold">Token:</span> {tokenData.token}
              </div>
              <div className="text-gray-300">
                <div>
                  <span className="font-bold">User ID:</span> {tokenData.userId}
                </div>
                <div>
                  <span className="font-bold">Role:</span> {tokenData.role}
                </div>
                {tokenData.room && (
                  <div className="mt-2">
                    <div>
                      <span className="font-bold">Room ID:</span>{" "}
                      {tokenData.room.id}
                    </div>
                    <div>
                      <span className="font-bold">Room Name:</span>{" "}
                      {tokenData.room.name}
                    </div>
                    <div>
                      <span className="font-bold">LiveKit Room ID:</span>{" "}
                      {tokenData.room.livekitRoomId}
                    </div>
                    <div>
                      <span className="font-bold">Status:</span>{" "}
                      {tokenData.room.status}
                    </div>
                    <div>
                      <span className="font-bold">Created At:</span>{" "}
                      {tokenData.room.createdAt}
                    </div>
                    <div>
                      <span className="font-bold">Updated At:</span>{" "}
                      {tokenData.room.updatedAt}
                    </div>
                  </div>
                )}
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
