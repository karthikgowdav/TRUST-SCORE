import { createContext, useContext, useState, useCallback } from "react";

const TrustScoreContext = createContext(null);

export function TrustScoreProvider({ children }) {
  const [scoreData, setScoreData] = useState(() => {
    try {
      const saved = localStorage.getItem("trustscore_data");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const updateScoreData = useCallback((data) => {
    setScoreData(data);
    if (data) {
      localStorage.setItem("trustscore_data", JSON.stringify(data));
    } else {
      localStorage.removeItem("trustscore_data");
    }
  }, []);

  const clearScoreData = useCallback(() => {
    setScoreData(null);
    localStorage.removeItem("trustscore_data");
  }, []);

  return (
    <TrustScoreContext.Provider value={{ scoreData, updateScoreData, clearScoreData }}>
      {children}
    </TrustScoreContext.Provider>
  );
}

export function useTrustScore() {
  const ctx = useContext(TrustScoreContext);
  if (!ctx) throw new Error("useTrustScore must be used within TrustScoreProvider");
  return ctx;
}
