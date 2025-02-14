import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY, // Expose API Key
  },
};

export default nextConfig;
