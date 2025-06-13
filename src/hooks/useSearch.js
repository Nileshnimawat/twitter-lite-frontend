import { SEARCH } from "../utility/constants";
import { useState } from "react";
import axios from "axios";

export const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUsers = async () => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${SEARCH}=${encodeURIComponent(query)}`, 
        { withCredentials: true });
      setResults(res.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchUsers };
};
