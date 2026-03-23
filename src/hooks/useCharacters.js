import { useState, useEffect, useCallback } from "react";
import { API_BASE } from "../constants/houses";

export function useCharacters(activeHouse) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const fetchCharacters = useCallback(async (house) => {
    setLoading(true);
    setError(null);
    try {
      const url =
        house === "all"
          ? `${API_BASE}/characters`
          : `${API_BASE}/characters/house/${house}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setCharacters(data);
    } catch {
      setError("The owls could not deliver the scroll. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(activeHouse);
  }, [activeHouse, fetchCharacters]);

  const retry = () => fetchCharacters(activeHouse);

  return { characters, loading, error, retry };
}