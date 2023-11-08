import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [giUrl, setGiUrl] = useState("");
  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=ZDvvSXffXfcvW7eQnVu3yHQfVbUOEAKt&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );

      const { data } = await response.json();
      setGiUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGiUrl(
        "https://th.bing.com/th/id/OIP.lDGOZtu15D37nQKyVtBgmgHaJQ?w=182&h=228&c=7&r=0&o=5&dpr=1.25&pid=1.7"
      );
    }
  };
  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);
  return giUrl;
};
export default useFetch;
