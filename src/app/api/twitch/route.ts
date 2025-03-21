//src>app>api>twitch>route.ts
import { NextResponse } from "next/server";

// Cache variables (for optimization)
let cachedData: any = null;
let lastFetched: number = 0;
const CACHE_DURATION = 55 * 60 * 1000; // 55 minutes

// Mock data for development (so you don’t always call Twitch API during development)
const mockData = {
  data: [
    {
      id: "12345",
      user_name: "Caedrel",
      game_name: "League of Legends",
      viewer_count: 23701,
      title: "🔴 LOS RATONES BEST OF 5 FEARLESS UPPER BRACKET PLAYOFFS!",
      thumbnail_url:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_caedrel-320x180.jpg",
    },
    {
      id: "12346",
      user_name: "PGL",
      game_name: "Counter-Strike",
      viewer_count: 19743,
      title: "[A] paiN Gaming vs. Astralis - PGL Cluj-Napoca 2025",
      thumbnail_url:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_pgl-320x180.jpg",
    },
    {
      id: "12347",
      user_name: "ohnePixel",
      game_name: "DARK SOULS III",
      viewer_count: 17059,
      title: "🔴 BLIND PLAYTHROUGH: DARK SOULS 3 🔴",
      thumbnail_url:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_ohnepixel-320x180.jpg",
    },
  ],
};

// Function to fetch Twitch data
const fetchTwitchData = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Using mock data for Twitch API");
    return mockData;
  }

  // Check cache validity
  const now = Date.now();
  if (cachedData && now - lastFetched < CACHE_DURATION) {
    console.log("Using cached Twitch data...");
    return cachedData;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Twitch API credentials.");
  }

  try {
    // Step 1: Get the OAuth token
    const authResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!authResponse.ok) {
      throw new Error("Failed to get Twitch OAuth token");
    }

    const authData = await authResponse.json();
    const oauthToken = authData.access_token;

    // Step 2: Fetch trending streams
    const twitchResponse = await fetch(
      "https://api.twitch.tv/helix/streams?language=en",
      {
        method: "GET",
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );

    if (!twitchResponse.ok) {
      throw new Error("Failed to fetch data from Twitch API");
    }

    const streamData = await twitchResponse.json();

    // Step 3: Format the response
    const formattedData = streamData.data.map((stream: any) => ({
      id: stream.id,
      user_name: stream.user_name,
      game_name: stream.game_name,
      viewer_count: stream.viewer_count,
      title: stream.title,
      thumbnail_url: stream.thumbnail_url
        ? stream.thumbnail_url
            .replace("{width}", "320")
            .replace("{height}", "180")
        : "https://placehold.co/320x180", // Default image if missing
    }));

    // Store in cache
    cachedData = { data: formattedData };
    lastFetched = now;

    return cachedData;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return { error: "Failed to fetch data from Twitch API" };
  }
};

// Handler for GET requests
export async function GET() {
  try {
    const data = await fetchTwitchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const languageFilter = process.env.TWITCH_LANGUAGE || "en";
const twitchResponse = await fetch(
  `https://api.twitch.tv/helix/streams?language=${languageFilter}`
);

