"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "../components/ui/skeleton";
import { FaEye, FaTimes } from "react-icons/fa";

interface TwitchStream {
  id: string;
  user_name: string;
  game_name: string;
  viewer_count: number;
  title: string;
  thumbnail_url?: string;
}

const formatViewerCount = (count: number) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + "K" : count.toString();
};

const GamesPage = () => {
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<TwitchStream | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const cachedData = sessionStorage.getItem("twitchStreams");
    if (cachedData) {
      setStreams(JSON.parse(cachedData));
      setLoading(false);
    } else {
      const fetchStreams = async () => {
        try {
          const res = await fetch("/api/twitch");
          const data = await res.json();
          if (data.error) {
            setError(data.error);
          } else {
            setStreams(data.data);
            sessionStorage.setItem("twitchStreams", JSON.stringify(data.data));
          }
        } catch (err) {
          setError("Failed to fetch data from Twitch API");
        } finally {
          setLoading(false);
        }
      };
      fetchStreams();
    }
  }, []);

  const handleGameClick = (game: TwitchStream) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const filteredStreams = streams
    .filter((stream) =>
      stream.game_name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.viewer_count - a.viewer_count);

  return (
    <>
      {/* SECTION 1: Trending Games & Live Streams */}
      <div className="p-8 space-y-8 bg-gray-800">
        <h1 className="text-4xl font-bold text-cyan-400 text-center py-8">
          Trending Games & Live Streams
        </h1>

        <input
          type="text"
          placeholder="Search for a game..."
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-40 bg-gray-700 rounded-lg" />
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500">
            {error}{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-blue-400 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStreams.map((stream) => (
            <motion.div
              key={stream.id}
              className="relative bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleGameClick(stream)}
            >
              <img
                src={
                  stream.thumbnail_url
                    ? stream.thumbnail_url
                        .replace("{width}", "320")
                        .replace("{height}", "180")
                    : "/default-thumbnail.jpg"
                }
                alt={stream.game_name}
                className="w-full h-40 object-cover rounded"
              />
              <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded">
                  TRENDING
                </span>

              <div className="flex justify-between items-center mt-2">
                <h3 className="text-lg text-cyan-400 font-semibold">
                  {stream.game_name}
                </h3>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  LIVE
                </span>
              </div>

              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                {stream.title}
              </p>

              <div className="flex items-center mt-2">
                <FaEye className="text-green-400 mr-2" />
                <p className="text-sm text-green-400 font-semibold">
                  {formatViewerCount(stream.viewer_count)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL: Game Details */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gray-900 p-9 rounded-lg w-[90%] sm:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto relative shadow-lg"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition"
              >
                <FaTimes />
              </button>

              {/* Game Details */}
              <h2 className="text-3xl text-cyan-400 font-bold mb-4">
                {selectedGame.game_name}
              </h2>

              {/* Thumbnail in Modal */}
              <img
                src={
                  selectedGame.thumbnail_url
                    ? selectedGame.thumbnail_url
                        .replace("{width}", "640")
                        .replace("{height}", "360")
                    : "/default-thumbnail.jpg"
                }
                alt={selectedGame.game_name}
                className="w-full h-48 object-cover rounded"
              />

              {/* Stream Info */}
              <p className="text-md text-gray-300 mt-4">{selectedGame.title}</p>
              <p className="text-md text-gray-400 mt-1">
                Streamer:{" "}
                <span className="text-white">{selectedGame.user_name}</span>
              </p>

              {/* Viewers Count */}
              <div className="flex items-center mt-2">
                <FaEye className="text-green-400 mr-2" />
                <p className="text-md text-green-400 font-semibold">
                  {formatViewerCount(selectedGame.viewer_count)}
                </p>
              </div>

              {/* Watch Button */}
              <a
                href={`https://www.twitch.tv/${selectedGame.user_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition"
              >
                Watch Live
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GamesPage;
