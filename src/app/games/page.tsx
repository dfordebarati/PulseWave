"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoLogoTwitch } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

// Mock Data (Replace with actual API calls later)
const games = [
  {
    id: 1,
    name: "Fortnite",
    description: "Free-to-play battle royale game",
    genre: "Battle Royale",
    releaseDate: "2017",
    rating: 4.5,
    likes: 4321,
    platform: "PC, PS4, Xbox",
    videoUrl: "https://www.youtube.com/embed/tmId_wHswRs",
    additionalInfo: "Fortnite is a multiplayer online battle royale game developed and published by Epic Games."
  },
  {
    id: 2,
    name: "Valorant",
    description: "Tactical shooter with unique agents",
    genre: "Shooter",
    releaseDate: "2020",
    rating: 4.7,
    likes: 2345,
    platform: "PC",
    videoUrl: "https://www.youtube.com/embed/xXaa0b8aEV4",
    additionalInfo: "Valorant is a free-to-play first-person tactical hero shooter game developed and published by Riot Games."
  },
  {
    id: 3,
    name: "Minecraft",
    description: "Build and explore endless worlds.",
    genre: "Sandbox",
    releaseDate: "2011",
    rating: 4.8,
    likes: 6789,
    platform: "PC, Console",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    additionalInfo: "Minecraft is a sandbox video game developed and published by Mojang Studios. The game allows players to build and explore virtual worlds made of blocks."
  },
];

const liveStreams = [
  {
    streamer: "Shroud",
    game: "Apex Legends",
    viewers: 12000,
    link: "https://www.twitch.tv/shroud",
  },
  {
    streamer: "Ninja",
    game: "Fortnite",
    viewers: 10000,
    link: "https://www.twitch.tv/ninja",
  },
];

const leaderboard = [
  { rank: 1, username: "Player1", score: 9800, game: "Apex Legends" },
  { rank: 2, username: "Player2", score: 9500, game: "Fortnite" },
  { rank: 3, username: "Player3", score: 9200, game: "Minecraft" },
];

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGameClick = (game: any) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-5xl text-center font-extrabold text-cyan-400 mb-10 neon-text">
        PulseWave Gaming Hub
      </h1>

      {/* Search Bar */}
      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search for Games..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-4 text-lg rounded-lg bg-gray-800 text-white border-2 border-cyan-500"
        />
      </div>

      {/* Trending Games */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Trending Games</h2>
        <div className="flex space-x-6 overflow-x-auto pb-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-none w-[280px] bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              <iframe
                width="100%"
                height="180"
                src={game.videoUrl}
                title={game.name}
                className="rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h3 className="text-2xl text-cyan-400 mt-4">{game.name}</h3>
              <p className="text-gray-400">{game.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Real-Time Leaderboards */}
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-white mb-6">Game Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <h3 className="text-2xl font-bold text-cyan-400">{entry.username}</h3>
              <p className="text-gray-400">Rank: {entry.rank} | Game: {entry.game}</p>
              <p className="text-yellow-400">{entry.score} Points</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Streams */}
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-white mb-6">Live Streams</h2>
        <div className="flex space-x-6">
          {liveStreams.map((stream) => (
            <a
              key={stream.streamer}
              href={stream.link}
              target="_blank"
              className="flex-none w-[280px] bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              <IoLogoTwitch size={40} className="text-purple-500" />
              <h3 className="text-2xl text-cyan-400 mt-4">{stream.streamer}</h3>
              <p className="text-gray-400">Game: {stream.game}</p>
              <p className="text-yellow-400">Viewers: {stream.viewers}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex justify-center space-x-4">
        <a href="#" className="text-cyan-400 hover:text-cyan-500">Discord</a>
        <a href="#" className="text-cyan-400 hover:text-cyan-500">Reddit</a>
        <a href="#" className="text-cyan-400 hover:text-cyan-500">Twitter</a>
      </div>

      {/* Game Description Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-[80%] sm:w-[60%] lg:w-[40%]">
            <h2 className="text-3xl text-cyan-400 mb-4">{selectedGame.name}</h2>
            <p className="text-lg text-gray-300 mb-4">{selectedGame.additionalInfo}</p>
            <p className="text-lg text-gray-300 mb-4">Genre: {selectedGame.genre}</p>
            <p className="text-lg text-gray-300 mb-4">Release Date: {selectedGame.releaseDate}</p>
            <p className="text-lg text-yellow-400 mb-4">Rating: {selectedGame.rating} / 5</p>
            <p className="text-lg text-gray-300 mb-4">Platform: {selectedGame.platform}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
