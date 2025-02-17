import { createContext, useContext, useState, useEffect } from "react";

interface TwitchStream {
  id: string;
  user_name: string;
  game_name: string;
  viewer_count: number;
  title: string;
  thumbnail_url?: string;
}

interface TwitchContextType {
  streams: TwitchStream[];
  loading: boolean;
  error: string | null;
}

const TwitchContext = createContext<TwitchContextType | undefined>(undefined);

export const TwitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const res = await fetch("/api/twitch");
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setStreams(data.data);
        }
      } catch (err) {
        setError("Failed to fetch data from Twitch API");
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, []);

  return (
    <TwitchContext.Provider value={{ streams, loading, error }}>
      {children}
    </TwitchContext.Provider>
  );
};

export const useTwitch = () => {
  const context = useContext(TwitchContext);
  if (!context) {
    throw new Error("useTwitch must be used within a TwitchProvider");
  }
  return context;
};
