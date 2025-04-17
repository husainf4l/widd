"use client";

import { Room } from "livekit-client";
import { generatePublisherToken } from "./generate_token";

const LIVEKIT_WS_URL = "wss://royaksa-virngt4o.livekit.cloud";

export async function sendCaptionAsBot(
  roomName: string,
  text: string,
  duration = 8000
) {
  if (!text || typeof text !== "string") {
    console.error("❌ Invalid caption text");
    return;
  }

  const tokenRes = await generatePublisherToken(roomName);
  const token = tokenRes?.token;
  if (!token) throw new Error("فشل في جلب توكن CaptionBot");

  const room = new Room();

  try {
    await room.connect(LIVEKIT_WS_URL, token);
    console.log("✅ CaptionBot connected");

    const message = JSON.stringify({
      type: "caption",
      text,
      duration,
    });

    const encoded = new TextEncoder().encode(message);

    console.log("📡 SENDING:", message);

    // ✅ This is the correct method for LiveKit v2
    await room.localParticipant.publishData(encoded, {
        reliable: true,
        topic: "caption",
      });
      
    console.log("✅ Caption sent");
  } catch (err) {
    console.error("❌ Failed to send caption:", err);
    throw err;
  } finally {
    room.disconnect();
    console.log("🚪 CaptionBot disconnected");
  }
}
