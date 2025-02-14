import axios from "axios";

const API_KEY = process.env.YOUTUBE_API_KEY; // Keep API key in .env.local

let trendingCache: any[] | null = null;
let apiCallCount = 0;

const trackUsage = () => {
  apiCallCount++;
  console.log(`YouTube API requests made: ${apiCallCount}`);
};

// Mock Data (Used in Development)
const mockTrendingVideos = [
  {
    id: "12345",
    snippet: {
      title: "Best Gaming Moments of 2025!",
      thumbnails: { medium: { url: "https://example.com/thumbnail1.jpg" } },
      channelTitle: "GamingHub",
    },
  },
  {
    id: "67890",
    snippet: {
      title: "New Game Releases This Month",
      thumbnails: { medium: { url: "https://example.com/thumbnail2.jpg" } },
      channelTitle: "GameNews",
    },
  },
];

// Function to fetch trending videos
export const fetchTrendingVideos = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Using mock data for trending videos");
    return mockTrendingVideos;
  }

  if (trendingCache) return trendingCache;

  try {
    trackUsage();
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          chart: "mostPopular",
          regionCode: "US",
          videoCategoryId: "20",
          key: API_KEY,
          maxResults: 5,
        },
      }
    );

    trendingCache = response.data.items;
    return response.data.items;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return [];
  }
};

// Function to search for videos
export const searchVideos = async (query: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Using mock data for search query: ${query}`);
    return mockTrendingVideos;
  }

  trackUsage();
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          key: API_KEY,
          videoCategoryId: "20",
          maxResults: 10,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};
