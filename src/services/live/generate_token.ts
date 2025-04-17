import { env } from '../../config/env';


export async function generateLivekitToken(roomName: string) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!accessToken) {
    throw new Error("لم يتم العثور على رمز الدخول");
  }
  const API_URL = `${env.apiUrl}/livekit`;

  const res = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ roomName }),
  });
  if (!res.ok) {
    throw new Error("فشل في جلب التوكن");
  }
  return res.json();
}

export async function generatePublisherToken(roomName: string) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!accessToken) {
    throw new Error("لم يتم العثور على رمز الدخول");
  }
  const API_URL = `${env.apiUrl}/livekit`;

  const res = await fetch(`${API_URL}/token/publisher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ roomName }),
  });
  if (!res.ok) {
    throw new Error("فشل في جلب توكن الناشر");
  }
  return res.json();
}

export async function fetchRooms() {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!accessToken) {
    throw new Error("لم يتم العثور على رمز الدخول");
  }
  const API_URL = `${env.apiUrl}/livekit`;

  const res = await fetch(`${API_URL}/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken.trim()}`,
    },
  });
  if (!res.ok) {
    throw new Error("فشل في جلب قائمة الغرف");
  }
  // Fix: unwrap the "rooms" array from the response object
  const data = await res.json();
  const rooms = Array.isArray(data.rooms) ? data.rooms : [];
  return rooms.map((room: {
    id: string;
    name: string;
    livekitRoomId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    description: string;
  }) => ({
    id: room.id,
    name: room.name,
    livekitRoomId: room.livekitRoomId,
    status: room.status,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    description: room.description,
  }));
}

