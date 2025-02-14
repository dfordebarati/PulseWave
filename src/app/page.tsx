"use client";

import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { fetchTrendingVideos, searchVideos } from "./lib/youtube";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getTrendingVideos = async () => {
      try {
        const fetchedVideos = await fetchTrendingVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching trending videos:", error);
      }
    };
    getTrendingVideos();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        const fetchedVideos = await fetchTrendingVideos();
        setVideos(fetchedVideos);
      } else {
        try {
          const fetchedVideos = await searchVideos(query);
          setVideos(fetchedVideos);
        } catch (error) {
          console.error("Error searching videos:", error);
        }
      }
    }, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handlePlayClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideoId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-5xl font-extrabold neon-text">PulseWave</h1>
        <p className="text-xl text-gray-400 mt-2">Your Ultimate Gaming Hub</p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center my-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for gaming videos..."
          className="search-bar w-3/4 max-w-xl"
        />
      </div>

      {/* Videos */}
      <main className="flex-grow px-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8 neon-text">
          Trending Gaming Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {videos.length === 0 ? (
            <div className="text-white text-center">No results found...</div>
          ) : (
            videos.map((video: any) => (
              <div key={video.id.videoId || video.id} className="video-card">
                <h3>{video.snippet.title}</h3>
                <p className="text-gray-400 mb-4 text-center">
                  {video.snippet.channelTitle}
                </p>
                <div className="w-full h-48 mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${
                      video.id.videoId || video.id
                    }`}
                    frameBorder="0"
                    allowFullScreen
                    title={video.snippet.title}
                    className="rounded-lg shadow-lg"
                  ></iframe>
                </div>
                <button
                  onClick={() => handlePlayClick(video.id.videoId || video.id)}
                  className="play-button w-full"
                >
                  Play
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal for playing video */}
      {showModal && selectedVideoId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out">
          <div className="bg-gray-900 rounded-3xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-2xl p-6 relative transform scale-110 opacity-100">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-red-700"
              >
                ✕
              </button>
            </div>
            <h3 className="text-2xl font-extrabold text-center text-white mb-4">
              Now Playing:{" "}
              {videos.find((v) => v.id.videoId === selectedVideoId)?.snippet
                .title}
            </h3>
            <div className="relative w-full h-96 mb-6 overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                frameBorder="0"
                allowFullScreen
                title="YouTube video player"
                className="rounded-lg shadow-2xl"
              ></iframe>
            </div>
            <p className="text-center text-sm text-white opacity-80">
              Enjoy the show! You can click the close button at any time to
              exit.
            </p>
          </div>
        </div>
      )}


    </div>
  );
}
